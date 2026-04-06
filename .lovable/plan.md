
Diagnosis

- The client-side blind insert fix is already present in `src/hooks/useSupabaseData.ts`, so the old read-after-insert RLS problem is no longer the active issue.
- The `subscribers` table already allows anonymous inserts, and the policy is compatible with the current payload (`name` + `email`).
- The table is still empty, which means submissions are not completing.
- There are no matching backend write/error traces for this flow, so the current failure looks like a request-transport / pending-state problem rather than a schema problem.

Implementation plan

1. Replace the direct browser insert with a dedicated backend function for newsletter signup.
   - Validate and normalize `email` and `name`
   - Insert into `subscribers`
   - Return explicit outcomes like `success`, `duplicate`, and `invalid`

2. Update `useSubscribe` in `src/hooks/useSupabaseData.ts` to call that backend function instead of inserting directly from the browser.
   - Make sure the request path cannot remain paused indefinitely
   - Add a timeout/fail-fast guard so `"Joining..."` never stalls forever

3. Keep all three signup UIs on the same shared submission logic:
   - `src/components/v2/EmailCaptureBrutalist.tsx`
   - `src/components/drops/DropsEmailCapture.tsx`
   - `src/components/EmailCaptureSection.tsx`

4. Improve the UI state handling in those forms.
   - Always clear pending state on success, duplicate, timeout, and failure
   - Show specific feedback for duplicate vs timeout vs generic error
   - Keep the success copy consistent across the site

5. Audit the other anonymous public mutations for the same pattern, especially `useSubmitEntry`, so another public form does not get stuck the same way later.

Technical details

- No database table change is required for `subscribers`; the current insert policy is already sufficient.
- The backend function is mainly for reliability, explicit responses, and easier debugging.
- The existing unique email constraint should be used for duplicate handling rather than custom client guesses.
- The current console warning around `ReturnVisitBanner` looks unrelated to the newsletter stall.

Validation

- Submit a brand-new email from `/` and confirm a row is created
- Re-submit the same email and confirm duplicate handling is immediate
- Test the same flow on `/drops` and the legacy email section
- Confirm the button always returns from `"Joining..."` in both success and failure cases
- Verify the behavior in both preview and published builds
