// Shared email validator used across all signup forms.
// Catches obvious typos like "gmail.comc" before they hit the database.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Common, valid TLDs. If the address's TLD is 4+ chars and NOT in this set,
// we treat it as suspicious (e.g. ".comc", ".orgg", ".nett").
const COMMON_TLDS = new Set([
  "com", "net", "org", "io", "co", "app", "dev", "me", "us", "uk", "ca", "au",
  "de", "fr", "es", "it", "nl", "se", "no", "fi", "dk", "ie", "pl", "pt", "ch",
  "at", "be", "cz", "gr", "ru", "ua", "tr", "il", "ae", "sa", "za",
  "jp", "kr", "cn", "hk", "tw", "sg", "in", "id", "ph", "th", "vn", "my",
  "br", "mx", "ar", "cl", "co", "pe", "ve",
  "nz", "edu", "gov", "mil", "int",
  "info", "biz", "tv", "xyz", "online", "store", "shop", "art", "studio",
  "email", "live", "news", "media", "agency", "design", "tech", "ai", "pro",
  "blog", "space", "site", "club", "fun", "world", "today", "ly", "cc", "to",
  "gg", "fm", "tv", "so", "is", "im", "name", "mobi", "asia", "tel",
]);

// Common domain typos → correct domain.
const DOMAIN_TYPOS: Record<string, string> = {
  // gmail
  "gmail.comc": "gmail.com",
  "gmail.con": "gmail.com",
  "gmail.cmo": "gmail.com",
  "gmail.cm": "gmail.com",
  "gmail.co": "gmail.com",
  "gmial.com": "gmail.com",
  "gnail.com": "gmail.com",
  "gmsil.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "gmal.com": "gmail.com",
  // yahoo
  "yahoo.con": "yahoo.com",
  "yahoo.comc": "yahoo.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "yahoo.co": "yahoo.com",
  // hotmail
  "hotmail.con": "hotmail.com",
  "hotmail.comc": "hotmail.com",
  "hotmal.com": "hotmail.com",
  "hotmial.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
  // outlook
  "outlook.con": "outlook.com",
  "outlok.com": "outlook.com",
  "outloo.com": "outlook.com",
  "outlook.comc": "outlook.com",
  // icloud
  "icloud.con": "icloud.com",
  "iclould.com": "icloud.com",
  "iclod.com": "icloud.com",
  "icloud.comc": "icloud.com",
  // aol
  "aol.con": "aol.com",
  "aol.comc": "aol.com",
  // proton
  "proton.con": "proton.me",
  "protonmail.con": "protonmail.com",
};

export type EmailValidationResult =
  | { valid: true; normalized: string }
  | { valid: false; reason: string; suggestion?: string };

export function validateEmail(raw: string): EmailValidationResult {
  const email = (raw || "").trim().toLowerCase();

  if (!email) return { valid: false, reason: "Email is required." };
  if (email.length > 254) return { valid: false, reason: "Email is too long." };
  if (!EMAIL_REGEX.test(email)) return { valid: false, reason: "That doesn't look like a valid email." };

  const [, domain] = email.split("@");
  if (!domain || domain.length < 3) return { valid: false, reason: "Email domain looks incomplete." };

  // Direct typo correction
  if (DOMAIN_TYPOS[domain]) {
    const fixed = `${email.split("@")[0]}@${DOMAIN_TYPOS[domain]}`;
    return { valid: false, reason: `Did you mean ${fixed}?`, suggestion: fixed };
  }

  // TLD allowlist check
  const parts = domain.split(".");
  const tld = parts[parts.length - 1];
  if (!tld || tld.length < 2) return { valid: false, reason: "Email domain is missing a valid extension." };

  if (tld.length >= 4 && !COMMON_TLDS.has(tld)) {
    // Try trimming one trailing char (catches .comc → .com, .nett → .net)
    const trimmed = tld.slice(0, -1);
    if (COMMON_TLDS.has(trimmed)) {
      const fixedDomain = [...parts.slice(0, -1), trimmed].join(".");
      const fixed = `${email.split("@")[0]}@${fixedDomain}`;
      return { valid: false, reason: `Did you mean ${fixed}?`, suggestion: fixed };
    }
    return { valid: false, reason: `".${tld}" doesn't look like a real domain extension.` };
  }

  return { valid: true, normalized: email };
}
