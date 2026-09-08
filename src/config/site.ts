/* ==========================================================================
   NV Power – central business facts (§2 of the build brief)

   ⚠️  EVERY value marked [PLACEHOLDER] must be replaced with the real fact
   before publishing. This is the ONLY file that needs editing – all pages
   read from here. Never publish unverifiable claims.
   ========================================================================== */

export const SITE_URL = "https://nvpower.bg";

/**
 * Is THIS deployment the canonical site?
 *
 * false while the build lives on a *.vercel.app preview URL and nvpower.bg still
 * serves the old (Wix) site. Two things go wrong otherwise: every page declares
 * a canonical of https://nvpower.bg/... which 404s over there, so search engines
 * drop the page or guess; and the demo competes with the real site for NV Power
 * brand terms.
 *
 * SITE_URL deliberately stays nvpower.bg so canonicals, hreflang, og:url and the
 * sitemap are already correct the moment this build becomes the real site – at
 * which point flip this to true and nothing else needs touching.
 */
export const SITE_INDEXABLE = false;

export const site = {
  name: "NV Power",
  /**
   * The company named as a legal person, for the copyright line and anywhere
   * else the entity signs off. `name` stays the brand form, because it feeds
   * og:site_name, the JSON-LD and aria labels, where "Ltd." would read oddly.
   * Latin in both locales, matching the homepage hero. No trailing full stop:
   * callers supply their own punctuation.
   */
  nameLegal: "NV Power Ltd",
  tagline: { bg: "Енергия за утрешния ден", en: "Energy for tomorrow" },

  /** Main phone – appears in header, click-to-call and the mobile CTA bar. */
  phone: "+359 876 109 405",
  phoneHref: "+359876109405",

  email: "office@nvpower.bg",

  /** Registered seat. `street`/`locality`/`postalCode` feed the JSON-LD. */
  address: {
    bg: "гр. София 1680, р-н Витоша, ж.к. Манастирски ливади, ул. „Казбек“ 57Б, вх. А, ет. 1, ап. партер",
    en: "57B Kazbek St, entrance A, floor 1, Manastirski Livadi, 1680 Sofia, Bulgaria",
    /**
     * The same seat, broken where it should break on screen. The single-line
     * forms above stay, because the privacy policy and the terms set the address
     * inside a running sentence and the JSON-LD wants it unbroken.
     */
    lines: {
      bg: [
        "гр. София 1680, р-н Витоша, ж.к. Манастирски ливади,",
        "ул. „Казбек“ 57Б, вх. А, ет. 1, ап. партер",
      ],
      en: [
        "57B Kazbek St, entrance A, floor 1,",
        "Manastirski Livadi, 1680 Sofia, Bulgaria",
      ],
    },
    street: {
      bg: "ж.к. Манастирски ливади, ул. „Казбек“ 57Б, вх. А, ет. 1, ап. партер",
      en: "57B Kazbek St, entrance A, floor 1, Manastirski Livadi",
    },
    locality: { bg: "София", en: "Sofia" },
    region: { bg: "р-н Витоша", en: "Vitosha district" },
    postalCode: "1680",
    country: "BG",
  },
  /** Google Maps embed for the seat. Empty would hide the map entirely. */
  mapsEmbed: "https://www.google.com/maps?q=%D1%83%D0%BB.%20%D0%9A%D0%B0%D0%B7%D0%B1%D0%B5%D0%BA%2057%D0%91%2C%20%D0%B6.%D0%BA.%20%D0%9C%D0%B0%D0%BD%D0%B0%D1%81%D1%82%D0%B8%D1%80%D1%81%D0%BA%D0%B8%20%D0%BB%D0%B8%D0%B2%D0%B0%D0%B4%D0%B8%2C%201680%20%D0%A1%D0%BE%D1%84%D0%B8%D1%8F%2C%20%D0%91%D1%8A%D0%BB%D0%B3%D0%B0%D1%80%D0%B8%D1%8F&output=embed",

  workingHours: { bg: "Пон – Пет: 09:00 – 18:00", en: "Mon – Fri: 09:00 – 18:00" },

  /** Legal identity. ДДС регистрация от 14.03.2025 (чл. 100 ал. 2 ЗДДС). */
  legal: {
    bg: "„ЕН ВИ ПАУЪР“ ООД · ЕИК 208173515 · ДДС № BG208173515",
    en: "NV Power Ltd · UIC 208173515 · VAT BG208173515",
  },

  /**
   * КЕВР licence, in two forms:
   *
   * `licenseFull` is the complete formal self-description, company name and ЕИК
   * included. It appears on the About page and in the AI facts, and nowhere
   * else, so the site does not repeat a legal paragraph on every page.
   *
   * `licenseRef` is the citation, for the footer, the contact page and the
   * trust bar.
   *
   * The number is Л-878-15, and the coordinator rights come from the 30.04.2026
   * amending decision rather than from the original licence.
   */
  licenseFull: {
    bg: "„ЕН ВИ ПАУЪР“ ООД (NV Power Ltd.), ЕИК: 208173515, лицензиран търговец на електрическа енергия, притежаващ Лицензия № Л-878-15 от 14.01.2026 г., изменена и допълнена с Решение № И1-Л-878 от 30.04.2026 г. на КЕВР с права и задължения на координатор на Стандартна балансираща група",
    en: "NV Power Ltd („ЕН ВИ ПАУЪР“ ООД), UIC: 208173515, a licensed electricity trader holding Licence No. L-878-15 of 14.01.2026, amended and supplemented by Decision No. И1-Л-878 of 30.04.2026 of the EWRC, with the rights and obligations of a coordinator of a Standard balancing group",
  },

  /** The licence reduced to a citation, for the footer and the trust bar. */
  licenseRef: {
    bg: "Лицензия № Л-878-15 / КЕВР",
    en: "EWRC licence No. L-878-15",
  },

  /**
   * The regulatory status, in the order it earns credibility: what we are
   * licensed to do, the role the licence grants, and the citation to check it
   * against. Rendered by TrustBar, so the homepage and the About page cannot
   * drift apart, and no page repeats the full legal sentence.
   *
   * No ЕСО registration number here: it is not verified anywhere in this
   * repository, and a trust signal nobody can check is worse than none.
   */
  trust: {
    bg: [
      "Лицензиран търговец на електрическа енергия",
      "Координатор на стандартна балансираща група",
      "Лицензия № Л-878-15 / КЕВР",
    ],
    en: [
      "Licensed electricity trader",
      "Coordinator of a standard balancing group",
      "EWRC licence No. L-878-15",
    ],
  },

  /**
   * Registration with ЕСО as a balancing-group coordinator, separate from the
   * КЕВР licence above. This substantiates the
   * "участие в балансиращата ни група" claim every buy-back plan makes, so it
   * is worth stating rather than leaving implicit.
   */
  balancingGroup: {
    bg: "Дружеството е регистрирано и като координатор на стандартна балансираща група към ЕСО",
    en: "The company is also registered as a coordinator of a standard balancing group with ESO",
  },

  /**
   * Empty entries are filtered out of the footer and out of the JSON-LD
   * `sameAs`, so only confirmed profiles ever appear. `sameAs` tells search
   * engines a page *represents this company*, which is why an unverified URL
   * does not belong there.
   *
   * facebook: left empty on purpose – the previous value
   * (facebook.com/nvpower) was a placeholder nobody confirmed. Paste the real
   * page here if there is one.
   */
  socials: {
    facebook: "",
    linkedin: "https://www.linkedin.com/company/nv-power-ltd",
    instagram: "",
  },

  /**
   * How long a reply takes.
   *
   * `confirmed: false` means the business has not signed off an SLA. While it
   * is false, every surface on the site says "възможно най-скоро" instead of a
   * number, via the two exports at the bottom of this file.
   *
   * To publish a real commitment: set `bg`/`en` to the agreed period, then flip
   * `confirmed` to true. Nothing else needs editing.
   *
   * [NEEDS BUSINESS CONFIRMATION] The site previously promised two different
   * periods at once, "оферта до 1 работен ден" and "отговор до 3 работни дни".
   */
  responseTime: { confirmed: false, bg: "3 работни дни", en: "3 business days" },

  /**
   * How offer prices are set. There is deliberately no published €/kWh figure:
   * every offer is a formula against the day-ahead price on the Bulgarian
   * energy exchange (БНЕБ / IBEX), so a fixed number would be wrong the next
   * day. The per-plan formulas live on /tok/; this is the one-line framing
   * reused wherever a page used to quote a rate.
   *
   * Bulgaria joined the euro area in January 2026, so the euro is the only
   * currency quoted anywhere on the site. Do not reintroduce lev pricing.
   */
  pricingBasis: {
    bg: "Цените по офертите са обвързани с цените на БНЕБ (IBEX)",
    en: "Offer prices are linked to the IBEX (БНЕБ) exchange prices",
  },
  /** Short form for hero lines and cards, where the sentence above is too long. */
  pricingBasisShort: {
    bg: "по цени, обвързани с БНЕБ (IBEX)",
    en: "at prices linked to IBEX (БНЕБ)",
  },

  /**
   * What sits on top of the energy price, said in a way that survives a change
   * of regulatory period.
   *
   * The old wording, "върху тях се начисляват ЗкО, акциз и ДДС", asserted three
   * charges as universal. ЗкО is set by КЕВР per regulatory period and can be
   * zero; excise rates differ by type of consumption; VAT treatment depends on
   * the customer. Anything more specific than this belongs in an individual
   * offer, not on a marketing page.
   *
   * If a concrete regulated value is ever published on the site, it must carry
   * the period it applies to. None is published today.
   */
  regulatedComponents: {
    bg: "Към цената на електрическата енергия могат да се прилагат мрежови, данъчни и други нормативно определени компоненти според типа клиент и действащата регулаторна рамка.",
    en: "Network, tax and other statutory components may apply on top of the electricity price, depending on the type of client and the regulatory framework in force.",
  },

  /**
   * The reference market, named once so the Bulgarian and English copy cannot
   * drift apart. `market` is the short form used inside cards and tables;
   * `marketFull` is the first-mention form a professional customer expects.
   */
  market: {
    bg: "БНЕБ, пазар „Ден напред“",
    en: "IBEX, Day-Ahead Market",
  },
  marketFull: {
    bg: "Българска независима енергийна борса (БНЕБ), пазар „Ден напред“",
    en: "Bulgarian Independent Energy Exchange (IBEX), Day-Ahead Market",
  },
  /**
   * Published formulas are the commercial headline, not the whole mechanism:
   * settlement and balancing rules live in the contract. Stated wherever a
   * formula is shown, so none of them reads as a complete methodology.
   */
  pricingMethodology: {
    bg: "Точната методика за остойностяване и балансиране се определя в договора.",
    en: "The exact valuation and balancing methodology is set out in the contract.",
  },

  price: {
    /**
     * Indicative *retail* rate, used for exactly one thing: valuing the solar
     * energy a site self-consumes in the calculator. It is never presented as
     * an offer price, and must not be, buy-back is quoted by formula against
     * the exchange. See `pricingBasis` above.
     */
    eurPerKwh: 0.099,
  },

  /** [PLACEHOLDER] §2 [TEAM] – at least founder/manager with a real photo */
  team: [
    // [PLACEHOLDER] Empty hides the whole Team section rather than showing an
    // invented person. Add real people with real photos to bring it back.
  ] as { name: Record<Locale, string>; role: Record<Locale, string>; photo: string }[],

  /**
   * [PLACEHOLDER] Form endpoint – POST target receiving multipart FormData
   * (e.g. https://formspree.io/f/XXXX, or your own serverless handler).
   * While this is empty every form shows the visitor the email/phone fallback
   * instead of a false "we got it" – see src/lib/lead.ts. Must be set, and the
   * origin added to connect-src + form-action in public/_headers, before launch.
   */
  formEndpoint: "" as string,

  gaMeasurementId: "", // [PLACEHOLDER] GA4 id, e.g. G-XXXXXXX; empty = analytics off
} as const;

export type Locale = "bg" | "en";

export const kwhPriceEUR = site.price.eurPerKwh;

/**
 * Can we honestly ask a visitor to hand over a file?
 *
 * Only with a real endpoint: until formEndpoint is set nothing is transmitted,
 * so an upload control would collect a document and silently drop it. Gates the
 * invoice-upload block on /tok/ and the attachment field in the contact form —
 * both come back on their own the moment an endpoint is configured.
 */
export const CAN_ACCEPT_UPLOADS = site.formEndpoint.trim().length > 0;

/**
 * Is the /oferta/ wizard fit to show?
 *
 * No, on two counts. It asks only solar questions (roof, mounting, battery)
 * while every buy-back CTA on /tok/ points at it, so a producer wanting to sell
 * power is handed a solar questionnaire; and with formEndpoint empty nothing it
 * collects is transmitted anyway. Seven steps for nothing is worse than no form.
 *
 * While this is false /oferta/ keeps its route, its SEO and every inbound link,
 * and offers the phone/email route instead. Flip it back once the wizard has a
 * producer branch and an endpoint — see the README TO-DO.
 */
export const OFFER_WIZARD_READY = false;

/**
 * The response period as it drops into a sentence:
 * `отговаряме ${responseWithin.bg}` / `we reply ${responseWithin.en}`.
 */
export const responseWithin = site.responseTime.confirmed
  ? { bg: `до ${site.responseTime.bg}`, en: `within ${site.responseTime.en}` }
  : { bg: "възможно най-скоро", en: "as soon as possible" };

/** The same fact as a standalone badge, for the hero check rows. */
export const responseBadge = site.responseTime.confirmed
  ? { bg: `Отговор до ${site.responseTime.bg}`, en: `Reply within ${site.responseTime.en}` }
  : { bg: "Отговаряме възможно най-скоро", en: "We reply as soon as possible" };
