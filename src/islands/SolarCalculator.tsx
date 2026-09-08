import { useEffect, useMemo, useRef, useState } from "react";
import { Sun, Zap, PiggyBank, CalendarClock, Leaf, TreePine, Car, BatteryCharging, Wallet, ArrowRight } from "lucide-react";
import type { Locale } from "../config/site";
import { r } from "../i18n/routes";
import { SOLAR_ASSUMPTIONS as A, computeSolar } from "../lib/solarModel";
import type { ObjectType, SolarMode } from "../lib/solarModel";

/* /kalkulator – client-side indicative estimate with fully transparent
   assumptions (expandable footnote). No contact data needed.

   The arithmetic lives in src/lib/solarModel.ts, not here: the same assumptions
   have to hold for the product pages, and a model buried in a UI island is a
   model nobody can check. This file only collects input and renders output. */

const KG_PER_LAP = A.sofiaRingKm * A.carKgPerKm;
const pct = (x: number) => `${Math.round(x * 100)}%`;

type Basis = "bill" | "kwh";

const copy = {
  bg: {
    inputsTitle: "Твоите данни",
    modeBill: "Знам месечната си сметка",
    modeKwh: "Знам консумацията в kWh",
    bill: "Месечна сметка за ток",
    kwh: "Месечна консумация",
    kwhUnit: "kWh",
    object: "Тип обект",
    objects: { home: "Дом", business: "Бизнес", industry: "Индустрия" },
    config: "Конфигурация",
    configs: { pv: "Само фотоволтаици", pv_bess: "Фотоволтаици + батерия" },
    configHint: "Батерията вдига собственото потребление, но и инвестицията. Затова двете се смятат отделно.",
    area: "Покривна площ в m² (по избор)",
    areaHint: "Ако я знаеш, ще съобразим системата с покрива ти.",
    resultsTitle: "Твоята система, на един поглед",
    estimate: "Ориентировъчна оценка, не оферта.",
    empty: "Въведи сметка или консумация и ще изчислим системата ти на момента, без данни за контакт.",
    kwpLabel: "Мощност на централата",
    bessLabel: "Батерия, полезен капацитет",
    productionLabel: "Годишно производство",
    savingsLabel: "Годишна икономия",
    capexLabel: "Ориентировъчна инвестиция",
    paybackLabel: "Прост срок на откупуване",
    paybackUnit: "години",
    usedTitle: "Използвани допускания",
    usedSelfUse: "собствено потребление",
    usedPrice: "цена на тока",
    usedYield: "добив",
    surplusNote: "Останалата произведена енергия излиза в мрежата. Тук е приета за нула, но може да се продава по договор за изкупуване.",
    surplusCta: "Виж условията за изкупуване",
    co2Label: "Спестен CO₂ годишно",
    co2Unit: "тона",
    treesPrefix: "колкото",
    treesSuffix: "засадени дървета",
    lapsPrefix: "или",
    lapsSuffix: "обиколки на София с бензинов автомобил по-малко",
    areaCapNote: "Ограничихме системата според посочената покривна площ.",
    cta: "Вземи точна оферта",
    ctaNote: "Ориентировъчна оценка · Без ангажимент · Без депозити",
    assumptionsTitle: "Как смятаме? Всички допускания, открито",
    billPh: "напр. 130",
    kwhPh: "напр. 1200",
    areaPh: "напр. 60",
    assumptions: (m: SolarMode) => [
      `Цена на тока: ${A.priceEurPerKwh.toFixed(3)} €/kWh. Индикативна стойност за изчислението, не оферта.`,
      `1 kWp фотоволтаици произвежда ~${A.yieldKwhPerKwp} kWh годишно в България.`,
      `1 kWp изисква ~${A.m2PerKwp} m² покривна площ.`,
      m === "pv"
        ? `Собствено потребление без батерия: ${pct(A.selfUse.pv.home)} за дом и ${pct(A.selfUse.pv.business)} за бизнес и индустрия. Без съхранение вечерното потребление не се покрива от покрива, а бизнесът консумира предимно през деня.`
        : `Собствено потребление с батерия: ${pct(A.selfUse.pv_bess.home)} за дом и ${pct(A.selfUse.pv_bess.business)} за бизнес и индустрия.`,
      "Икономията идва само от енергията, която потребяваш сам. Излишъкът е приет за нула, макар че може да се продава по договор за изкупуване на цена, обвързана с борсата, затова оценката е консервативна.",
      m === "pv"
        ? `Инвестиция: ~${A.capexEurPerKwp.home} €/kWp за дом и ~${A.capexEurPerKwp.business} €/kWp за бизнес и индустрия, до ключ, преди финансиране, без батерия.`
        : `Инвестиция: ~${A.capexEurPerKwp.home} €/kWp за дом и ~${A.capexEurPerKwp.business} €/kWp за бизнес и индустрия, плюс ~${A.bessEurPerKwh} €/kWh за батерията. Батерията е оразмерена ${A.bessKwhPerKwp} kWh на kWp, както в публикуваната хибридна конфигурация 10 kWp + 10 kWh.`,
      "Съотношението 1 kWh на kWp идва от публикуваната домашна конфигурация. За по-голям обект батерията се оразмерява по товаровия профил, затова там числото е само ориентир.",
      "Мощността на батерията в kW и режимът на резервно захранване се определят при проектирането на конкретния обект, затова не ги допускаме тук.",
      "Срокът е прост: инвестиция, делена на годишна икономия. Без дисконтиране, без деградация на панелите и без бъдещи промени в цената на тока.",
      `CO₂: ${A.co2KgPerKwh} кг спестен CO₂ на произведен kWh; 1 дърво поглъща ~${A.treeKgPerYear} кг CO₂/год; 1 обиколка на околовръстното на София е ~${A.sofiaRingKm} км при ~120 г CO₂/км за бензинов автомобил.`,
      "Числата са ориентировъчна оценка, не оферта. Точните зависят от покрива, засенчването и профила на потребление, затова финалната оферта я прави инженер, а не калкулатор.",
    ],
  },
  en: {
    inputsTitle: "Your details",
    modeBill: "I know my monthly bill",
    modeKwh: "I know my kWh consumption",
    bill: "Monthly electricity bill",
    kwh: "Monthly consumption",
    kwhUnit: "kWh",
    object: "Site type",
    objects: { home: "Home", business: "Business", industry: "Industry" },
    config: "Configuration",
    configs: { pv: "Photovoltaics only", pv_bess: "Photovoltaics + battery" },
    configHint: "A battery raises self-consumption, and the investment with it. That is why the two are costed separately.",
    area: "Roof area in m² (optional)",
    areaHint: "If you know it, we'll size the system to your roof.",
    resultsTitle: "Your system at a glance",
    estimate: "An indicative estimate, not a quote.",
    empty: "Enter a bill or consumption and we'll size your system instantly, no contact details needed.",
    kwpLabel: "Installed capacity",
    bessLabel: "Battery, usable capacity",
    productionLabel: "Annual production",
    savingsLabel: "Annual savings",
    capexLabel: "Indicative investment",
    paybackLabel: "Simple payback",
    paybackUnit: "years",
    usedTitle: "Assumptions used",
    usedSelfUse: "self-consumption",
    usedPrice: "electricity price",
    usedYield: "yield",
    surplusNote: "The rest of the generated energy goes to the grid. It is valued at zero here, but it can be sold under a buy-back contract.",
    surplusCta: "See the buy-back terms",
    co2Label: "CO₂ saved per year",
    co2Unit: "tonnes",
    treesPrefix: "like",
    treesSuffix: "planted trees",
    lapsPrefix: "or",
    lapsSuffix: "fewer laps around Sofia in a petrol car",
    areaCapNote: "We capped the system to the roof area you entered.",
    cta: "Get an exact quote",
    ctaNote: "An indicative estimate · No commitment · No deposits",
    assumptionsTitle: "How do we calculate? All assumptions, in the open",
    billPh: "e.g. 130",
    kwhPh: "e.g. 1200",
    areaPh: "e.g. 60",
    assumptions: (m: SolarMode) => [
      `Electricity price: €${A.priceEurPerKwh.toFixed(3)}/kWh. An indicative rate for this calculation, not a quote.`,
      `1 kWp of photovoltaics produces ~${A.yieldKwhPerKwp} kWh per year in Bulgaria.`,
      `1 kWp needs ~${A.m2PerKwp} m² of roof area.`,
      m === "pv"
        ? `Self-consumption without a battery: ${pct(A.selfUse.pv.home)} for a home and ${pct(A.selfUse.pv.business)} for business and industry. Without storage the evening load cannot be met from the roof, while a business consumes mostly during the day.`
        : `Self-consumption with a battery: ${pct(A.selfUse.pv_bess.home)} for a home and ${pct(A.selfUse.pv_bess.business)} for business and industry.`,
      "Savings come only from the energy you use yourself. The surplus is valued at zero here, although it can be sold under a buy-back contract at a market-linked price, so the estimate is a conservative one.",
      m === "pv"
        ? `Investment: ~€${A.capexEurPerKwp.home}/kWp for homes and ~€${A.capexEurPerKwp.business}/kWp for business and industry, turnkey, before financing, without a battery.`
        : `Investment: ~€${A.capexEurPerKwp.home}/kWp for homes and ~€${A.capexEurPerKwp.business}/kWp for business and industry, plus ~€${A.bessEurPerKwh}/kWh for the battery. The battery is sized at ${A.bessKwhPerKwp} kWh per kWp, as in the published 10 kWp + 10 kWh hybrid configuration.`,
      "The ratio of 1 kWh per kWp comes from the published residential configuration. On a larger site storage is sized to the load profile, so there the figure is only an indication.",
      "Battery power in kW and the backup-supply arrangement are set when the specific site is designed, so we make no assumption about them here.",
      "The payback is simple: investment divided by annual savings. No discounting, no panel degradation and no future changes in the price of electricity.",
      `CO₂: ${A.co2KgPerKwh} kg of CO₂ saved per kWh produced; 1 tree absorbs ~${A.treeKgPerYear} kg CO₂/year; 1 lap of the Sofia ring road is ~${A.sofiaRingKm} km at ~120 g CO₂/km for a petrol car.`,
      "These numbers are an indicative estimate, not a quote. The exact ones depend on your roof, shading and consumption profile, which is why the final quote comes from an engineer, not a calculator.",
    ],
  },
} as const;

/* ---------- animated number ---------- */
function useCountUp(target: number, numLocale: string, decimals = 0): string {
  const [val, setVal] = useState(target);
  const fromRef = useRef(target);
  const rafRef = useRef(0);

  useEffect(() => {
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVal(target);
      fromRef.current = target;
      return;
    }
    const from = fromRef.current;
    const start = performance.now();
    const dur = 550;
    cancelAnimationFrame(rafRef.current);
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(from + (target - from) * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
      else fromRef.current = target;
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target]);

  return val.toLocaleString(numLocale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export default function SolarCalculator({ locale }: { locale: Locale }) {
  const t = copy[locale];
  // Number formatting follows the reading locale; the currency is always EUR.
  const numLocale = locale === "bg" ? "bg-BG" : "en-GB";
  const [basis, setBasis] = useState<Basis>("bill");
  const [bill, setBill] = useState("");
  const [kwh, setKwh] = useState("");
  const [objectType, setObjectType] = useState<ObjectType>("home");
  const [config, setConfig] = useState<SolarMode>("pv_bess");
  const [area, setArea] = useState("");

  const res = useMemo(() => {
    const monthlyKwh =
      basis === "bill"
        ? parseFloat(bill.replace(",", ".")) / A.priceEurPerKwh
        : parseFloat(kwh.replace(",", "."));
    if (!Number.isFinite(monthlyKwh) || monthlyKwh <= 0) return null;

    const areaNum = parseFloat(area.replace(",", "."));
    const m = computeSolar({
      annualKwh: monthlyKwh * 12,
      objectType,
      mode: config,
      areaM2: Number.isFinite(areaNum) ? areaNum : undefined,
    });
    if (!m) return null;

    return {
      ...m,
      co2Tons: Math.round((m.co2Kg / 1000) * 10) / 10,
      trees: Math.max(1, Math.round(m.co2Kg / A.treeKgPerYear)),
      laps: Math.max(1, Math.round(m.co2Kg / KG_PER_LAP)),
    };
  }, [basis, bill, kwh, objectType, config, area]);

  const aKwp = useCountUp(res?.kwp ?? 0, numLocale, 1);
  const aBess = useCountUp(res?.bessKwh ?? 0, numLocale);
  const aProduction = useCountUp(res?.productionKwh ?? 0, numLocale);
  const aSavingsEUR = useCountUp(res?.annualSavingsEur ?? 0, numLocale);
  const aCapex = useCountUp(res?.capexEur ?? 0, numLocale);
  const aPayback = useCountUp(res?.paybackYears ?? 0, numLocale, 1);
  const aCo2 = useCountUp(res?.co2Tons ?? 0, numLocale, 1);

  /* The enquiry form is the real next step, so send people straight to it with
     their subject already chosen. Indexes match ContactForm's interest list. */
  const interest = objectType === "home" ? 2 : 3;
  const offerHref = `${r(locale, "kontakti")}?interest=${interest}#zapitvane`;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      {/* ------- inputs ------- */}
      <div className="card p-6 md:p-8">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-body">{t.inputsTitle}</h2>

        {/* mode tabs */}
        <div className="mt-5 grid grid-cols-2 gap-2" role="group" aria-label={t.inputsTitle}>
          {([["bill", t.modeBill], ["kwh", t.modeKwh]] as const).map(([m, label]) => (
            <button
              key={m}
              type="button"
              onClick={() => setBasis(m)}
              aria-pressed={basis === m}
              className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all ${basis === m ? "border-accent bg-accent text-accent-contrast shadow-md" : "border-line bg-surface-alt text-body hover:border-accent/50"}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-5">
          {basis === "bill" ? (
            <label className="grid gap-1.5 text-sm font-semibold text-body" htmlFor="calc-bill">
              {t.bill}
              <span className="flex items-center gap-2">
                <input
                  id="calc-bill"
                  className="field"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="10"
                  placeholder={t.billPh}
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                />
                <span className="text-sm font-bold text-muted">€</span>
              </span>
            </label>
          ) : (
            <label className="grid gap-1.5 text-sm font-semibold text-body" htmlFor="calc-kwh">
              {t.kwh}
              <span className="flex items-center gap-2">
                <input
                  id="calc-kwh"
                  className="field"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="50"
                  placeholder={t.kwhPh}
                  value={kwh}
                  onChange={(e) => setKwh(e.target.value)}
                />
                <span className="text-sm font-bold text-muted">{t.kwhUnit}</span>
              </span>
            </label>
          )}

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-body">{t.object}</legend>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(t.objects) as ObjectType[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setObjectType(k)}
                  aria-pressed={objectType === k}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all ${objectType === k ? "border-accent bg-accent text-accent-contrast shadow-md" : "border-line bg-surface-alt text-body hover:border-accent/50"}`}
                >
                  {t.objects[k]}
                </button>
              ))}
            </div>
          </fieldset>

          {/* PV and PV+BESS are costed and sized on separate assumptions; the
              old single model mixed a battery's self-consumption with a
              battery-free price. */}
          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-body">{t.config}</legend>
            <div className="grid grid-cols-2 gap-2">
              {(["pv", "pv_bess"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setConfig(k)}
                  aria-pressed={config === k}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all ${config === k ? "border-accent bg-accent text-accent-contrast shadow-md" : "border-line bg-surface-alt text-body hover:border-accent/50"}`}
                >
                  {t.configs[k]}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted">{t.configHint}</p>
          </fieldset>

          <label className="grid gap-1.5 text-sm font-semibold text-body" htmlFor="calc-area">
            {t.area}
            <input
              id="calc-area"
              className="field"
              type="number"
              inputMode="decimal"
              min="0"
              step="5"
              placeholder={t.areaPh}
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
            <span className="text-xs font-normal text-muted">{t.areaHint}</span>
          </label>
        </div>
      </div>

      {/* ------- results ------- */}
      <div className="card flex flex-col overflow-hidden" aria-live="polite">
        <div className="bg-band px-6 py-5 md:px-8">
          <h2 className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-xl font-bold text-white">
            <Sun className="size-5 text-accent" aria-hidden="true" />
            {t.resultsTitle}
          </h2>
          <p className="mt-1 text-sm text-white/70">{t.estimate}</p>
        </div>

        {!res ? (
          <div className="flex flex-1 items-center justify-center p-8 md:p-10">
            <p className="max-w-sm text-center text-muted">{t.empty}</p>
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-5 p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-accent/10 p-4">
                <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-accent uppercase">
                  <Zap className="size-3.5" aria-hidden="true" />
                  {t.kwpLabel}
                </p>
                <p className="mt-1.5 font-[family-name:var(--font-display)] text-3xl font-bold text-accent">
                  {aKwp} <span className="text-base font-bold">kWp</span>
                </p>
              </div>
              {config === "pv_bess" && (
                <div className="rounded-xl bg-accent/10 p-4">
                  <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-accent uppercase">
                    <BatteryCharging className="size-3.5" aria-hidden="true" />
                    {t.bessLabel}
                  </p>
                  <p className="mt-1.5 font-[family-name:var(--font-display)] text-3xl font-bold text-accent">
                    {aBess} <span className="text-base font-bold">{t.kwhUnit}</span>
                  </p>
                </div>
              )}
              <div className="rounded-xl bg-surface-alt p-4">
                <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-muted uppercase">
                  <Sun className="size-3.5" aria-hidden="true" />
                  {t.productionLabel}
                </p>
                <p className="mt-1.5 font-[family-name:var(--font-display)] text-3xl font-bold text-body">
                  {aProduction} <span className="text-base font-bold">{t.kwhUnit}</span>
                </p>
              </div>
              <div className="rounded-xl bg-accent/10 p-4">
                <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-accent uppercase">
                  <PiggyBank className="size-3.5" aria-hidden="true" />
                  {t.savingsLabel}
                </p>
                <p className="mt-1.5 font-[family-name:var(--font-display)] text-3xl font-bold text-accent">
                  {/* English puts the symbol first (€1,076); Bulgarian trails it (1076 €). */}
                  {locale === "en" ? (
                    <>
                      <span className="text-base font-bold">€</span>
                      {aSavingsEUR}
                    </>
                  ) : (
                    <>
                      {aSavingsEUR} <span className="text-base font-bold">€</span>
                    </>
                  )}
                </p>
              </div>
              <div className="rounded-xl bg-surface-alt p-4">
                <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-muted uppercase">
                  <Wallet className="size-3.5" aria-hidden="true" />
                  {t.capexLabel}
                </p>
                <p className="mt-1.5 font-[family-name:var(--font-display)] text-3xl font-bold text-body">
                  {locale === "en" ? (
                    <>
                      <span className="text-base font-bold">€</span>
                      {aCapex}
                    </>
                  ) : (
                    <>
                      {aCapex} <span className="text-base font-bold">€</span>
                    </>
                  )}
                </p>
              </div>
              <div className="rounded-xl bg-surface-alt p-4">
                <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-muted uppercase">
                  <CalendarClock className="size-3.5" aria-hidden="true" />
                  {t.paybackLabel}
                </p>
                <p className="mt-1.5 font-[family-name:var(--font-display)] text-3xl font-bold text-body">
                  {aPayback} <span className="text-base font-bold">{t.paybackUnit}</span>
                </p>
              </div>
            </div>

            {/* The three numbers that move the result most, next to the result
                itself rather than only in the footnote below. */}
            <p className="text-sm text-muted">
              <strong className="font-semibold text-body">{t.usedTitle}:</strong> {t.usedSelfUse} {pct(res.selfUseShare)} · {t.usedPrice}{" "}
              {A.priceEurPerKwh.toFixed(3)} €/{t.kwhUnit} · {t.usedYield} {A.yieldKwhPerKwp} {t.kwhUnit}/kWp
            </p>

            {/* Only self-consumed energy is counted as a saving, so the larger
                the exported share the more conservative the payback above. */}
            <p className="text-sm text-muted">
              {t.surplusNote}{" "}
              <a href={r(locale, "tok")} className="font-semibold text-accent underline underline-offset-2">
                {t.surplusCta}
              </a>
            </p>

            {res.cappedByArea && <p className="rounded-xl bg-accent/10 px-4 py-2.5 text-sm font-medium text-accent">{t.areaCapNote}</p>}

            <div className="rounded-xl border border-accent/25 bg-accent/10 p-4">
              <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-accent uppercase">
                <Leaf className="size-3.5" aria-hidden="true" />
                {t.co2Label}
              </p>
              <p className="mt-1.5 font-[family-name:var(--font-display)] text-2xl font-bold text-body">
                {aCo2} <span className="text-base font-bold">{t.co2Unit}</span>
              </p>
              <ul className="mt-2.5 flex flex-col gap-1.5 text-sm text-muted">
                <li className="flex items-center gap-2">
                  <TreePine className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  {t.treesPrefix} <strong className="text-body">{res.trees.toLocaleString(numLocale)}</strong> {t.treesSuffix}
                </li>
                <li className="flex items-center gap-2">
                  <Car className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  {t.lapsPrefix} <strong className="text-body">{res.laps.toLocaleString(numLocale)}</strong> {t.lapsSuffix}
                </li>
              </ul>
            </div>

            <div className="mt-auto flex flex-col items-center gap-2 pt-1">
              <a href={offerHref} className="btn btn-primary w-full !py-4 text-base sm:w-auto sm:!px-10">
                {t.cta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <p className="text-xs text-muted">{t.ctaNote}</p>
            </div>
          </div>
        )}
      </div>

      {/* ------- assumptions footnote ------- */}
      <details className="faq-item card group px-5 py-4 md:px-6 lg:col-span-2">
        <summary className="flex items-center justify-between gap-4 font-[family-name:var(--font-display)] text-sm font-bold text-body transition-colors hover:text-accent">
          {t.assumptionsTitle}
          <svg viewBox="0 0 24 24" className="chev size-5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </summary>
        <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed text-muted">
          {t.assumptions(config).map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}
