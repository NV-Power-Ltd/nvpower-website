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
   * КЕВР licence, worded as the register states it: one licence covering both
   * activities. Quoted activity name kept verbatim.
   */
  license: {
    bg: "Лицензия № Л-878 от 14.01.2026 г. за дейността „търговия с електрическа енергия и координатор на стандартна балансираща група“, издадена от КЕВР",
    en: "Licence No. L-878 of 14.01.2026 for the activity of “electricity trading and standard balancing group coordinator”, issued by EWRC",
  },

  /**
   * Registration with ЕСО as a balancing-group coordinator, separate from the
   * КЕВР licence above. This substantiates the
   * "участие в балансиращата ни група" claim every buy-back plan makes, so it
   * is worth stating rather than leaving implicit.
   */
  balancingGroup: {
    bg: "Дружеството е регистрирано и като координатор на стандартни балансиращи групи към ЕСО",
    en: "The company is also registered as a coordinator of standard balancing groups with ESO",
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

  /** Response promise repeated sitewide (§8): "в рамките на 3 работни дни". */
  responseTime: { bg: "3 работни дни", en: "3 business days" },

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
