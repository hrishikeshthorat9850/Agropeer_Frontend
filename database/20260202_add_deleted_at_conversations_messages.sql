-- Migration: Add deleted_at columns to conversations and messages (soft delete support)
-- Date: 2026-02-02
-- Notes:
--  - Adds nullable `deleted_at` TIMESTAMP WITH TIME ZONE columns to support soft deletes
--  - Adds indexes to improve lookup performance when filtering out deleted rows
--  - After running this, update your application queries to ignore rows where deleted_at IS NOT NULL
--  - If you use RLS policies, consider updating them to enforce that deleted rows aren't returned to normal users

BEGIN;

-- Add deleted_at to conversations
ALTER TABLE IF EXISTS conversations
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE NULL;

-- Add deleted_at to messages
ALTER TABLE IF EXISTS messages
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE NULL;

-- Indexes to speed up queries that filter on deleted_at (optional but recommended)
CREATE INDEX IF NOT EXISTS idx_conversations_deleted_at ON conversations(deleted_at);
CREATE INDEX IF NOT EXISTS idx_messages_deleted_at ON messages(deleted_at);

COMMIT;

-- Rollback (manual):
-- ALTER TABLE conversations DROP COLUMN IF EXISTS deleted_at;
-- ALTER TABLE messages DROP COLUMN IF EXISTS deleted_at;
-- DROP INDEX IF EXISTS idx_conversations_deleted_at;
-- DROP INDEX IF EXISTS idx_messages_deleted_at;
