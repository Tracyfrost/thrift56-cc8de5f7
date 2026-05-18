## Add stricter email validation to signup forms

**Problem:** `coxrocket25@gmail.comc` got into the subscribers table because the only check is the browser's native `type="email"` validation, which accepts any `.xx` TLD including typos like `.comc`, `.con`, `.cmo`, `.cmm`.

**Fix:** Add a shared client-side validator that runs on submit (and on blur for instant feedback), with a soft "Did you mean...?" confirm step for the most common typos.

### Files to change

1. **New `src/lib/validateEmail.ts`** — single source of truth:
   - Regex check (RFC-ish: `^[^\s@]+@[^\s@]+\.[^\s@]+$`)
   - Length cap (254 chars)
   - TLD allowlist check against common TLDs (`com`, `net`, `org`, `io`, `co`, `app`, `dev`, `me`, `us`, `uk`, `ca`, `au`, `de`, `fr`, `es`, `it`, `nl`, `se`, `no`, `jp`, `kr`, `cn`, `in`, `br`, `mx`, `edu`, `gov`, `mil`, `info`, `biz`, `tv`, `xyz`, `online`, `store`, `shop`, `art`, `studio`, `email`, `live`, `news`, `media`, `agency`, `design`, `tech`, `ai`, `pro`, `blog`, `space`, `site`, `club`, `fun`, `world`, `today`, `ly`) — if TLD not in list AND length ≥ 4, flag as suspicious.
   - Typo-correction map for common domain typos: `gmail.comc/gmial.com/gmail.con/gmail.cmo → gmail.com`, `yahoo.con/yaho.com → yahoo.com`, `hotmal.com/hotmail.con → hotmail.com`, `outlok.com → outlook.com`, `iclould.com/icloud.con → icloud.com`.
   - Returns `{ valid: boolean, reason?: string, suggestion?: string }`.

2. **Apply to all 4 email-capture surfaces:**
   - `src/components/drops/DropsEmailCapture.tsx`
   - `src/components/v2/EmailCaptureBrutalist.tsx`
   - `src/components/EmailCaptureSection.tsx`
   - `src/components/EmailPopup.tsx` (and any signup spots inside `EntryForm.tsx`, `SubscribePrompt.tsx` — quick audit during implementation)

   In each: on submit, run the validator. If `suggestion` exists, show a toast with "Did you mean `gmail.com`? [Use it] [Send anyway]" pattern (inline confirm — clicking the toast action swaps the email and re-submits). If invalid with no suggestion, block submit with an error toast.

3. **Edge function `supabase/functions/subscribe-drop-alerts/index.ts`** — add the same regex + TLD check server-side so bypasses (direct API calls, broken JS) are also caught. Mirrors `validateEmail.ts` logic in Deno.

4. **Admin cleanup helper (optional, small):** In the Email List tab, add a tiny "Suspicious" filter chip that flags rows where the email's TLD isn't in the allowlist — gives a one-click way to spot and delete the existing `.comc` row and any others already in the table.

### Out of scope
- DNS MX-record verification (requires server lookup — overkill for this).
- Third-party validation services (Kickbox, ZeroBounce) — would cost money and add a dependency.

### Notes
- Keeps UX friendly: typo-suggestion never hard-blocks legit-but-unusual addresses, just nudges.
- Single shared validator means future signup forms automatically inherit the protection.
