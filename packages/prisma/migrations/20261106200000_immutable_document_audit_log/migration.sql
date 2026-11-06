-- Make the document audit trail append-only (evidence must not be changed).
-- Allowed:
--   * INSERT (normal logging)
--   * UPDATE that only sets "envelopeId" to NULL (FK ON DELETE SET NULL when a document is deleted)
--   * DELETE only when the session explicitly enables a purge, e.g. the LGPD retention job:
--       SELECT set_config('app.allow_audit_log_purge', 'on', true);  -- inside the same transaction
CREATE OR REPLACE FUNCTION "prevent_document_audit_log_change"() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF NEW."envelopeId" IS NULL
      AND NEW."id" = OLD."id"
      AND NEW."createdAt" = OLD."createdAt"
      AND NEW."type" = OLD."type"
      AND NEW."data"::text = OLD."data"::text
      AND NEW."name" IS NOT DISTINCT FROM OLD."name"
      AND NEW."email" IS NOT DISTINCT FROM OLD."email"
      AND NEW."userId" IS NOT DISTINCT FROM OLD."userId"
      AND NEW."userAgent" IS NOT DISTINCT FROM OLD."userAgent"
      AND NEW."ipAddress" IS NOT DISTINCT FROM OLD."ipAddress" THEN
      RETURN NEW;
    END IF;
    RAISE EXCEPTION 'DocumentAuditLog is append-only: updates are not allowed';
  END IF;

  IF TG_OP = 'DELETE' THEN
    IF current_setting('app.allow_audit_log_purge', true) = 'on' THEN
      RETURN OLD;
    END IF;
    RAISE EXCEPTION 'DocumentAuditLog is append-only: deletes are not allowed';
  END IF;

  -- TRUNCATE
  RAISE EXCEPTION 'DocumentAuditLog is append-only: truncate is not allowed';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "document_audit_log_append_only"
BEFORE UPDATE OR DELETE ON "DocumentAuditLog"
FOR EACH ROW EXECUTE FUNCTION "prevent_document_audit_log_change"();

-- TRUNCATE bypasses row triggers, so block it too.
CREATE TRIGGER "document_audit_log_no_truncate"
BEFORE TRUNCATE ON "DocumentAuditLog"
FOR EACH STATEMENT EXECUTE FUNCTION "prevent_document_audit_log_change"();
