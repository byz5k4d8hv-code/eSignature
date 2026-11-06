# Compliance changes (Brazil LGPD + UK/EU GDPR)

Our changes on top of Documenso. Keep them small so upstream updates still merge cleanly.

| # | Change | Where |
|---|---|---|
| 1 | Audit trail is append-only: a database trigger blocks UPDATE, DELETE and TRUNCATE on `DocumentAuditLog`. The only update allowed is `envelopeId -> NULL` (needed when a document is deleted). A purge is allowed only inside a transaction that runs `SELECT set_config('app.allow_audit_log_purge', 'on', true)` (for the future retention job). | `packages/prisma/migrations/20261106200000_immutable_document_audit_log` |
| 2 | Privacy notice for signers (PT + EN) and a link to it on the signing screen. | `apps/remix/app/routes/_unauthenticated+/articles.privacy-notice.tsx`, `document-signing-disclosure.tsx` |
| 3 | SHA-256 of the document as sent for signing is printed in the footer of the signing certificate pages. | `seal-document.handler.ts`, `generate-certificate-pdf.ts`, `render-certificate.ts` |

## Decisions
- Signature level: advanced electronic signature (Lei 14.063/2020; MP 2.200-2 art. 10 §2; eIDAS AdES; ESIGN/UETA). Qualified ICP-Brasil signature is out of scope.
- Retention: 5 years after completion. No automatic deletion job yet (nothing reaches 5 years before 2031); build it before then.
- Enterprise features (`packages/ee`, commercial licence) stay off.
- Known limit: `envelopeId` has `ON UPDATE CASCADE`; Envelope ids never change today, but if they ever did, the trigger would block it.

## Tests
- `docs/compliance/test-audit-log-immutable.sql`: run after migrations; the three "must fail" statements must raise "DocumentAuditLog is append-only".

## Before real use (all free)
- `NEXT_PRIVATE_SIGNING_TIMESTAMP_AUTHORITY=http://timestamp.digicert.com`
- Signing certificate: self-signed `.p12` (see SIGNING.md). Use an e-CNPJ before selling.
- Set `NEXT_PUBLIC_SUPPORT_EMAIL` to a real contact address (shown in the privacy notice).
