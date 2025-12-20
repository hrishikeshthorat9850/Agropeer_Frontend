-- Add firebase_uid column to userinfo table
-- This allows storing Firebase UIDs separately while keeping UUID id column
-- Run this SQL in Supabase SQL Editor

-- Step 1: Add firebase_uid column
ALTER TABLE userinfo 
ADD COLUMN IF NOT EXISTS firebase_uid TEXT UNIQUE;

-- Step 2: Create index for faster Firebase UID lookups
CREATE INDEX IF NOT EXISTS idx_userinfo_firebase_uid ON userinfo(firebase_uid);

-- Step 3: Verify the column was added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'userinfo' AND column_name = 'firebase_uid';

-- Expected result:
-- column_name: firebase_uid
-- data_type: text
-- is_nullable: YES

