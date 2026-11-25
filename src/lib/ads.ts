/* Google Ads conversion tracking. The IDs come from the Google Ads account
   and must match it exactly; change them there first, then here. */

export const ADS_ID = "AW-18571587446";

export const ADS = {
  form: "AW-18571587446/nfPNCP2nrb8dEPbez5dF",
  phone: "AW-18571587446/tzoyCICorb8dEPbez5dF",
  message: "AW-18571587446/3gr2CIOorb8dEPbez5dF",
} as const;

type Gtag = (...args: unknown[]) => void;

function getGtag(): Gtag | undefined {
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  return typeof g === "function" ? g : undefined;
}

/** Send one conversion. The callback, if given, runs once: on the tag's
 *  confirmation, or after 800ms if the tag is blocked or slow. */
export function trackConversion(sendTo: string, extra: Record<string, unknown> = {}, callback?: () => void) {
  const gtag = getGtag();
  if (!gtag) {
    callback?.();
    return;
  }
  let done = false;
  const finish = () => {
    if (!done) {
      done = true;
      callback?.();
    }
  };
  gtag("event", "conversion", {
    send_to: sendTo,
    value: 1.0,
    currency: "EUR",
    ...extra,
    event_callback: finish,
  });
  if (callback) setTimeout(finish, 800);
}

/** Bulgarian phone number to E.164 (+359…), or null when it does not look
 *  like one. Only a confident result is sent to enhanced conversions. */
export function normalizePhoneBG(raw: string): string | null {
  let p = raw.replace(/[\s\-().\/]/g, "");
  if (p.startsWith("00")) p = "+" + p.slice(2);
  else if (p.startsWith("0")) p = "+359" + p.slice(1);
  else if (p.startsWith("359")) p = "+" + p;
  if (!p.startsWith("+")) return null;
  // E.164: + then 8–15 digits; Bulgarian numbers are +359 and 8–9 more digits
  if (!/^\+\d{8,15}$/.test(p)) return null;
  if (p.startsWith("+359") && !/^\+359\d{8,9}$/.test(p)) return null;
  return p;
}

/** True only when the visitor has accepted marketing cookies in the banner. */
function hasMarketingConsent(): boolean {
  try {
    const c = JSON.parse(localStorage.getItem("nvpower-consent") || "null");
    return !!c && c.marketing === true;
  } catch {
    return false;
  }
}

/** Enhanced conversions: gtag hashes these before sending. Gated on marketing
 *  consent ourselves, as the privacy policy promises, rather than relying on
 *  Consent Mode alone to discard them. */
export function setUserData(email: string, phone: string) {
  const gtag = getGtag();
  if (!gtag || !hasMarketingConsent()) return;
  const data: Record<string, string> = {};
  const e = email.trim().toLowerCase();
  if (e.includes("@")) data.email = e;
  const ph = normalizePhoneBG(phone);
  if (ph) data.phone_number = ph;
  if (Object.keys(data).length) gtag("set", "user_data", data);
}
