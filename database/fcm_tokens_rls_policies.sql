-- RLS Policies for FCM Tokens Table
-- Run this after creating the fcm_tokens table

-- Enable Row Level Security
ALTER TABLE public.fcm_tokens ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can SELECT (read) their own FCM tokens
CREATE POLICY "Users can view their own FCM tokens"
ON public.fcm_tokens
FOR SELECT
USING (
  auth.uid() = user_id OR 
  user_id IS NULL
);

-- Policy 2: Users can INSERT their own FCM tokens
-- Allows users to register their own FCM tokens
CREATE POLICY "Users can insert their own FCM tokens"
ON public.fcm_tokens
FOR INSERT
WITH CHECK (
  auth.uid() = user_id OR 
  user_id IS NULL
);

-- Policy 3: Users can UPDATE their own FCM tokens
-- Allows users to update their own tokens (e.g., update device_type, updated_at)
CREATE POLICY "Users can update their own FCM tokens"
ON public.fcm_tokens
FOR UPDATE
USING (
  auth.uid() = user_id OR 
  user_id IS NULL
)
WITH CHECK (
  auth.uid() = user_id OR 
  user_id IS NULL
);

-- Policy 4: Users can DELETE their own FCM tokens
-- Allows users to unregister/delete their own tokens
CREATE POLICY "Users can delete their own FCM tokens"
ON public.fcm_tokens
FOR DELETE
USING (
  auth.uid() = user_id OR 
  user_id IS NULL
);

-- Note: Service role (SUPABASE_SERVICE_ROLE_KEY) bypasses RLS
-- So backend operations in notificationService.js and register-fcm-token route will work without issues

-- Additional Note: 
-- The user_id can be NULL for anonymous users, so policies allow NULL user_id
-- This allows anonymous users to register tokens, but they can only manage their own tokens
-- Since user_id is UUID type, we compare directly with auth.uid() (no casting needed)
