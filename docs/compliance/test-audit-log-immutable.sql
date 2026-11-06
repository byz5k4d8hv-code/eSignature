-- Manual check for migration 20261106200000_immutable_document_audit_log.
-- Run against a database where all migrations were applied. Each statement marked
-- "must fail" should raise "DocumentAuditLog is append-only".
BEGIN;
INSERT INTO "DocumentAuditLog"(id, type, data, "ipAddress") VALUES ('immut-test', 'TEST', '{}', '1.2.3.4');
SAVEPOINT s;
UPDATE "DocumentAuditLog" SET "ipAddress" = '9.9.9.9' WHERE id = 'immut-test'; -- must fail
ROLLBACK TO s;
DELETE FROM "DocumentAuditLog" WHERE id = 'immut-test'; -- must fail
ROLLBACK TO s;
TRUNCATE "DocumentAuditLog"; -- must fail
ROLLBACK TO s;
SELECT set_config('app.allow_audit_log_purge', 'on', true);
DELETE FROM "DocumentAuditLog" WHERE id = 'immut-test'; -- allowed (purge flag, this transaction only)
ROLLBACK;
