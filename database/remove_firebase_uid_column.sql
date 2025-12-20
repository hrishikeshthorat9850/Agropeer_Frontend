-- Remove firebase_uid column from userinfo table
-- This column was added for Firebase auth but is no longer needed
-- Run this SQL in Supabase SQL Editor

-- Step 1: Drop the index first
DROP INDEX IF EXISTS idx_userinfo_firebase_uid;

-- Step 2: Remove the firebase_uid column
ALTER TABLE userinfo 
DROP COLUMN IF EXISTS firebase_uid;

-- Step 3: Verify the column was removed
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'userinfo' AND column_name = 'firebase_uid';

-- Expected result: No rows returned (column removed)

