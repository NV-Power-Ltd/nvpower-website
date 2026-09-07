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
  tagline: { bg: "Енергия за утрешния ден", en: "Energy for tomorrow" },

  /** Main phone – appears in header, click-to-call and the mobile CTA bar. */
  phone: "+359 876 109 405",
  phoneHref: "+359876109405",

  email: "info@nvpower.bg",

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

  /** КЕВР licence. Covers trading *and* balancing-group coordination. */
  license: {
    bg: "Лицензия № Л-878 от 14.01.2026 г. за търговия с електрическа енергия и координатор на стандартна балансираща група / КЕВР",
    en: "Licence No. L-878 of 14.01.2026 for electricity trading and standard balancing group coordination / EWRC",
  },

  /**
   * Registration with ЕСО as a balancing-group coordinator. This is what
   * substantiates the "участие в балансиращата ни група" claim the buy-back
   * plans all make, so it is worth stating rather than leaving implicit.
   */
  balancingGroup: {
    bg: "Координатор на стандартни балансиращи групи към ЕСО ЕАД · договор BAL-091/09.06.2026 г.",
    en: "Coordinator of standard balancing groups with ESO EAD · contract BAL-091/09.06.2026",
  },

  /** [PLACEHOLDER] real social profiles – remove any that don't exist */
  socials: {
    facebook: "https://www.facebook.com/nvpower",
    linkedin: "https://www.linkedin.com/company/nvpower",
    instagram: "",
  },

  /** Response promise repeated sitewide (§8): "в рамките на 3 работни дни". */
  responseTime: { bg: "3 работни дни", en: "3 business days" },

  /**
   * Electricity price – published and transparent.
   * Bulgaria joined the euro area in January 2026, so the euro is the only
   * currency quoted anywhere on the site. Do not reintroduce lev pricing.
   */
  price: {
    /**
     * [PLACEHOLDER] Indicative rate the solar calculator computes with. It is
     * NOT shown as a published tariff anywhere – `display` below is masked
     * until a real price is agreed, so no invented figure can be read as a
     * commitment. Set both together.
     */
    eurPerKwh: 0.099,
    /** [PLACEHOLDER] the publicly quoted price – masked until confirmed. */
    display: { bg: "XXX €/кВтч", en: "€XXX/kWh" },
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
