-- RLS Policies for Notifications Table
-- Run this after creating the notifications table

-- Enable Row Level Security
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can SELECT (read) their own notifications
CREATE POLICY "Users can view their own notifications"
ON public.notifications
FOR SELECT
USING (auth.uid() = user_id);

-- Policy 2: Users can UPDATE (mark as read) their own notifications
CREATE POLICY "Users can update their own notifications"
ON public.notifications
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy 3: Prevent users from INSERTING their own notifications
-- (Only backend/service role should insert notifications)
-- This policy denies all user inserts
CREATE POLICY "Users cannot insert notifications"
ON public.notifications
FOR INSERT
WITH CHECK (false);

-- Policy 4: Prevent users from DELETING notifications
-- (Notifications should not be deleted by users)
CREATE POLICY "Users cannot delete notifications"
ON public.notifications
FOR DELETE
USING (false);

-- Note: Service role (SUPABASE_SERVICE_ROLE_KEY) bypasses RLS
-- So backend operations in notificationService.js will work without issues

