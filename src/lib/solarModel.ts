import { site } from "../config/site";

/**
 * The solar financial model, in one place.
 *
 * It used to live inline in SolarCalculator.tsx and was internally
 * inconsistent: it applied a 70% self-consumption share, which a home only
 * reaches with storage, to a CAPEX of 970 €/kWp, which is a PV-only price. The
 * result was a payback for a system nobody sells.
 *
 * Two configurations are modelled separately now, and every assumption below
 * either comes from a published figure on the site or is flagged as needing
 * business confirmation. Nothing here is a quotation.
 */

export type SolarMode = "pv" | "pv_bess";
export type ObjectType = "home" | "business" | "industry";

/**
 * Where each number comes from:
 *
 * yieldKwhPerKwp   the calculator's original constant, unchanged.
 * m2PerKwp         the calculator's original constant, unchanged.
 * priceEurPerKwh   site.price.eurPerKwh, the indicative retail rate. NOT an
 *                  offer price: buy-back is quoted by formula, see site.ts.
 * capexEurPerKwp   the calculator's original constant, unchanged. It is a
 *                  PV-only price, and /solar/za-doma/ corroborates it: the
 *                  published 5 kWp card without a battery is 4 600 – 6 150 €,
 *                  i.e. 920 – 1 230 €/kWp, which brackets 970.
 * bessKwhPerKwp    from the published hybrid card, 10 kWp with 10 kWh. That
 *                  card is residential; applying the same ratio to a 50 kWp
 *                  commercial roof is an extrapolation, and the assumptions
 *                  list says so. Real storage is sized to the load profile.
 * bessEurPerKwh    derived from the two published cards, not invented:
 *                    hybrid 10 kWp + 10 kWh   12 800 – 17 900 €, mid 15 350 €
 *                    PV part at 970 €/kWp                        9 700 €
 *                    implied 10 kWh of storage                   5 650 €
 *                  => 565 €/kWh. The width of the published range means the
 *                  implied figure spans 310 – 820 €/kWh; the midpoint is used.
 *
 * selfUse          THE ONE SET WITHOUT A FULL SOURCE.
 *                  pv_bess values are the calculator's originals, unchanged.
 *                  pv values are lower because without storage the evening load
 *                  cannot be covered; for business and industry the daytime
 *                  load already coincides with generation, which is the point
 *                  /solar/za-biznesa/ makes, so the gap there is small.
 *                  [NEEDS BUSINESS CONFIRMATION] — see the README.
 */
export const SOLAR_ASSUMPTIONS = {
  yieldKwhPerKwp: 1150,
  m2PerKwp: 5,
  priceEurPerKwh: site.price.eurPerKwh,
  capexEurPerKwp: { home: 970, business: 770, industry: 770 } as Record<ObjectType, number>,
  bessKwhPerKwp: 1,
  bessEurPerKwh: 565,
  selfUse: {
    pv: { home: 0.3, business: 0.65, industry: 0.65 } as Record<ObjectType, number>,
    pv_bess: { home: 0.7, business: 0.8, industry: 0.8 } as Record<ObjectType, number>,
  },
  co2KgPerKwh: 0.4,
  treeKgPerYear: 21,
  sofiaRingKm: 61,
  carKgPerKm: 0.12,
} as const;

export interface SolarInput {
  /** Annual consumption in kWh, however the visitor arrived at it. */
  annualKwh: number;
  objectType: ObjectType;
  mode: SolarMode;
  /** Optional roof area in m², caps the system size. */
  areaM2?: number;
}

export interface SolarResult {
  kwp: number;
  /** Usable storage capacity in kWh. Zero for PV only. */
  bessKwh: number;
  /** True when roof area, not consumption, decided the size. */
  cappedByArea: boolean;
  productionKwh: number;
  selfUseShare: number;
  selfUsedKwh: number;
  annualSavingsEur: number;
  capexEur: number;
  /** Simple payback in years: CAPEX divided by annual saving. No discounting,
   *  no degradation, no price escalation. An indicative figure only. */
  paybackYears: number;
  co2Kg: number;
}

/**
 * Size a system for a consumption figure and cost it, for one configuration.
 *
 * Deliberately simple: simple payback, no discounting or escalation. The point
 * is an indicative comparison between PV and PV + BESS on identical
 * assumptions, not a financial model.
 */
export function computeSolar({ annualKwh, objectType, mode, areaM2 }: SolarInput): SolarResult | null {
  const A = SOLAR_ASSUMPTIONS;
  if (!Number.isFinite(annualKwh) || annualKwh <= 0) return null;

  let kwp = annualKwh / A.yieldKwhPerKwp;
  let cappedByArea = false;
  if (Number.isFinite(areaM2) && (areaM2 as number) > 0 && (areaM2 as number) / A.m2PerKwp < kwp) {
    kwp = (areaM2 as number) / A.m2PerKwp;
    cappedByArea = true;
  }
  kwp = Math.max(0.5, Math.round(kwp * 2) / 2);

  const bessKwh = mode === "pv_bess" ? Math.round(kwp * A.bessKwhPerKwp) : 0;
  const productionKwh = kwp * A.yieldKwhPerKwp;
  const selfUseShare = A.selfUse[mode][objectType];

  // You cannot self-consume more than you generate, nor more than you use.
  const selfUsedKwh = Math.min(productionKwh * selfUseShare, annualKwh);
  const annualSavingsEur = selfUsedKwh * A.priceEurPerKwh;

  const capexEur = kwp * A.capexEurPerKwp[objectType] + bessKwh * A.bessEurPerKwh;
  const paybackYears = annualSavingsEur > 0 ? capexEur / annualSavingsEur : 0;

  return {
    kwp,
    bessKwh,
    cappedByArea,
    productionKwh: Math.round(productionKwh),
    selfUseShare,
    selfUsedKwh: Math.round(selfUsedKwh),
    annualSavingsEur: Math.round(annualSavingsEur),
    capexEur: Math.round(capexEur),
    paybackYears: Math.round(paybackYears * 10) / 10,
    co2Kg: productionKwh * A.co2KgPerKwh,
  };
}
