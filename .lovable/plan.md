## Goal

Make the Contact page actually deliver messages: save each submission to the database AND email a notification to your Thrift 56 brand inbox, plus send a confirmation to the visitor.

## Steps

1. **Set up sender email domain** (one-time)
   - You'll be prompted to set up `notify.thrift56.com` as the sending domain so emails come from your brand (e.g. `noreply@thrift56.com`).
   - You'll also confirm the recipient address (e.g. `hello@thrift56.com`) for receiving contact submissions.

2. **Database table for contact submissions**
   - New `contact_messages` table: name, email, message, created_at.
   - Public can insert (with length validation); only admins can read — same pattern as `community_suggestions`.

3. **Email infrastructure + templates**
   - Provision the email queue/sending infrastructure.
   - Two app email templates, styled in Thrift 56 brand (bone white bg, rust accents, brutalist headings):
     - **Visitor confirmation**: "We got your message" sent to the form submitter.
     - **Owner notification**: "New contact message from {name}" sent to your brand inbox with the full message.

4. **Wire the Contact page**
   - On submit: insert row into `contact_messages`, then trigger both emails via the send function with idempotency keys.
   - Keep existing toast UX; show error toast on failure.

5. **Admin viewing (optional, included)**
   - Add a "Contact Messages" tab/section in `/admin` so you can read submissions in-app (not just via email).

## Technical notes

- Uses Lovable's built-in email system (no third-party API keys).
- DNS verification for the sender domain happens after setup — emails start sending automatically once verified; you can monitor in Cloud → Emails.
- Rate-limit / retry / suppression all handled by the queue.
