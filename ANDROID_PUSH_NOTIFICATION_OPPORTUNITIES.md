# Android Push Notification Opportunities Across the App

## ✅ Already Implemented

### 1. **Chat Messages** ✅
- **Location:** `server/server.js` (lines 221-303)
- **When:** User receives a new message
- **Recipient:** Message recipient (if offline or not viewing the conversation)
- **Notification Details:**
  - Title: "New message from [Sender Name]" or "New inquiry about [Product Name]"
  - Body: Message content preview
  - Deep Link: `/chats?conversationId=[conversation_id]`
- **Smart Logic:** Only sends if recipient is offline OR not viewing that conversation

### 2. **Weather Alerts** ✅
- **Location:** `server/lib/notificationService.js` (lines 196-232)
- **When:** Critical weather conditions detected (high temp, rain, wind)
- **Recipient:** Users with location data
- **Rate Limit:** 3 alerts per user per day
- **Notification Details:**
  - Title: Weather alert title
  - Body: Alert description
  - Deep Link: `/weather`

---

## 🔔 High Priority - Social Interactions (NOT YET IMPLEMENTED)

### 3. **Post Comments** ⭐⭐⭐
- **Location:** `components/Posts.jsx` (line 276-342), `components/PostCreate.jsx` (line 324-362)
- **Current Behavior:** Comments saved directly to Supabase `post_comments` table
- **When:** Someone comments on a user's post
- **Recipient:** Post owner (exclude commenter)
- **Notification Should Include:**
  - Title: "New comment on your post"
  - Body: "[Commenter Name]: [Comment preview (50 chars)]"
  - Deep Link: `/posts?postId=[post_id]`
- **Implementation Needed:** Add notification logic after comment insertion in:
  - `components/Posts.jsx` → `saveComment()` function
  - `components/PostCreate.jsx` → `addComment()` function
  - Or create API route: `app/api/post-comment/route.js`

### 4. **Comment Replies** ⭐⭐⭐
- **Location:** `components/Posts.jsx` (line 500-557)
- **Current Behavior:** Replies saved with `parent_comment_id` to `post_comments` table
- **When:** Someone replies to a user's comment
- **Recipient:** Original comment author (exclude replier)
- **Notification Should Include:**
  - Title: "[User] replied to your comment"
  - Body: "[Reply text preview (50 chars)]"
  - Deep Link: `/posts?postId=[post_id]`
- **Implementation Needed:** Add notification logic in `handleReplySubmit()` function

### 5. **Post Likes** ⭐⭐
- **Location:** `components/Posts.jsx` (line 352-413), `components/PostCreate.jsx` (line 248-293)
- **Current Behavior:** Likes saved directly to Supabase `post_likes` table
- **When:** Someone likes a user's post
- **Recipient:** Post owner (exclude liker)
- **Notification Should Include:**
  - Title: "[User] liked your post"
  - Body: "[Post caption preview (50 chars)]"
  - Deep Link: `/posts?postId=[post_id]`
- **Consideration:** May want to batch multiple likes (e.g., "5 people liked your post")
- **Implementation Needed:** Add notification logic in:
  - `components/Posts.jsx` → `handleLikeClick()` function
  - `components/PostCreate.jsx` → `handleLikeClick()` function
  - Or create API route: `app/api/posts/[id]/like/route.js`

### 6. **Comment Likes** ⭐⭐
- **Location:** `components/Posts.jsx` (line 559-586)
- **Current Behavior:** Comment likes saved via API route
- **When:** Someone likes a user's comment
- **Recipient:** Comment author (exclude liker)
- **Notification Should Include:**
  - Title: "[User] liked your comment"
  - Body: "[Comment preview (50 chars)]"
  - Deep Link: `/posts?postId=[post_id]`
- **Implementation Needed:** Check if API route exists: `app/api/comments/[id]/like/route.js` and add notification logic

---

## 🛒 Medium Priority - Marketplace (NOT YET IMPLEMENTED)

### 7. **Product Favorites** ⭐⭐
- **Location:** `app/market/page.jsx` (line 367-394)
- **Current Behavior:** Favorites saved to `user_favorites` table
- **When:** Someone favorites a user's product
- **Recipient:** Product owner
- **Notification Should Include:**
  - Title: "[User] favorited your product"
  - Body: "[Product name]"
  - Deep Link: `/market?id=[product_id]`
- **Implementation Needed:** Add notification logic in `toggleFavorite()` function

### 8. **New Product Listing** ⭐
- **Location:** `components/SellForm.jsx` (line 514-580)
- **Current Behavior:** Products saved to `agri_products` table
- **When:** User creates a new product listing
- **Recipient:** Users who follow the seller OR users interested in that category
- **Notification Should Include:**
  - Title: "New product: [Product Name]"
  - Body: "[Seller Name] listed [Product Name] for ₹[Price]"
  - Deep Link: `/market?id=[product_id]`
- **Note:** Requires follow system or category interest tracking
- **Implementation Needed:** Add notification logic in `onSubmit()` function after successful insert

### 9. **Product Price Updates** ⭐
- **Location:** `components/SellForm.jsx` (line 541-546)
- **Current Behavior:** Products updated in `agri_products` table
- **When:** Seller updates product price
- **Recipient:** Users who favorited this product
- **Notification Should Include:**
  - Title: "Price update: [Product Name]"
  - Body: "Price changed to ₹[new_price]"
  - Deep Link: `/market?id=[product_id]`
- **Implementation Needed:** Add notification logic in `onSubmit()` function when updating product

---

## 📰 Low Priority - Content Updates (NOT YET IMPLEMENTED)

### 10. **New Posts from Followed Users** ⭐
- **Location:** `components/PostCreate.jsx` (line 120-220)
- **Current Behavior:** Posts saved to `posts` table
- **When:** A followed user creates a new post
- **Recipient:** Followers
- **Notification Should Include:**
  - Title: "[User] posted something new"
  - Body: "[Post caption preview (50 chars)]"
  - Deep Link: `/posts?postId=[post_id]`
- **Note:** Requires follow system implementation
- **Implementation Needed:** Add notification logic in `uploadAndCreatePost()` function

### 11. **Market Price Updates** ⭐
- **Location:** `supabase/functions/fetch_market_prices/index.ts`
- **Current Behavior:** Market prices fetched and upserted daily
- **When:** Significant price change for a crop/product user is interested in
- **Recipient:** Users who favorited that product/crop OR users tracking that commodity
- **Notification Should Include:**
  - Title: "💰 Price Update: [Crop Name]"
  - Body: "Price changed to ₹[new_price] at [Market Name]"
  - Deep Link: `/market-prices`
- **Implementation Needed:** Add notification logic after price upsert, check for significant changes

### 12. **New News Articles** ⭐
- **Location:** Admin pages (if exists)
- **When:** Admin publishes new news article
- **Recipient:** All users OR users who favorited news category
- **Notification Should Include:**
  - Title: "📰 New Article: [Title]"
  - Body: "[Summary preview]"
  - Deep Link: `/news/[article_id]`
- **Consideration:** May want to batch daily digest instead
- **Implementation Needed:** Find where news articles are created and add notification logic

### 13. **New Government Schemes** ⭐
- **Location:** Admin pages (if exists)
- **When:** Admin adds new government scheme
- **Recipient:** All users OR users who favorited schemes
- **Notification Should Include:**
  - Title: "🏛️ New Government Scheme"
  - Body: "[Scheme Name]"
  - Deep Link: `/government-schemes/[scheme_id]`
- **Implementation Needed:** Find where schemes are created and add notification logic

---

## 🔒 System/Account Notifications (NOT YET IMPLEMENTED)

### 14. **Account Activity Alerts** ⭐
- **When:** Login from new device, password change, etc.
- **Recipient:** User
- **Notification Should Include:**
  - Title: "🔒 Security Alert"
  - Body: "New login detected from [device/location]"
  - Deep Link: `/settings`
- **Implementation Needed:** Find authentication routes and add notification logic

### 15. **Post/Product Approval** ⭐⭐
- **When:** Admin approves/rejects user's post or product
- **Recipient:** Post/Product creator
- **Notification Should Include:**
  - Title: "Your [post/product] was [approved/rejected]"
  - Body: "[Reason if rejected]"
  - Deep Link: `/profile` or `/posts/[id]` or `/market?id=[product_id]`
- **Implementation Needed:** Find admin approval logic and add notification logic

---

## 📊 Summary by Priority

### ✅ Already Implemented (2)
1. Chat Messages
2. Weather Alerts

### 🔔 High Priority - Should Implement Next (6)
1. Post Comments
2. Comment Replies
3. Post Likes
4. Comment Likes
5. Product Favorites
6. Product Price Updates

### 🛒 Medium Priority (3)
7. New Product Listing
8. Market Price Updates
9. Post/Product Approval

### 📰 Low Priority (6)
10. New Posts from Followed Users
11. New News Articles
12. New Government Schemes
13. Account Activity Alerts
14. Story Interactions (if applicable)
15. Other system notifications

---

## 🛠️ Implementation Pattern

For each notification opportunity, follow this pattern:

```javascript
// After successful database operation
try {
  // ... existing code ...
  
  // Send notification (non-blocking)
  if (recipientId && recipientId !== currentUserId) {
    const { sendNotificationToUser } = await import('@/server/lib/notificationService');
    await sendNotificationToUser(recipientId, {
      title: "Notification Title",
      body: "Notification body text",
      data: {
        type: 'notification_type',
        id: itemId,
        url: `/deep/link/path`,
      },
    });
  }
} catch (notifError) {
  // Log but don't break main functionality
  console.error("Error sending notification:", notifError);
}
```

---

## 📝 Notes

- All notifications should be **non-blocking** (don't affect main functionality)
- All notifications should check `user_id` to prevent self-notifications
- All notifications should include proper deep links for navigation
- Notification failures should be logged but not crash the app
- Consider batching for high-frequency notifications (likes, etc.)
- Consider rate limiting for system notifications (news, schemes, etc.)

---

## 🎯 Recommended Implementation Order

1. **Post Comments** - Most engaging, users want to know when someone comments
2. **Comment Replies** - Important for conversation threads
3. **Post Likes** - Social validation (consider batching)
4. **Comment Likes** - Similar to post likes
5. **Product Favorites** - Important for sellers
6. **Product Price Updates** - Useful for buyers tracking products
7. **New Product Listing** - If follow system exists
8. **Post/Product Approval** - Important for user feedback
9. **Market Price Updates** - If users can track commodities
10. **Other low-priority items** - As needed
