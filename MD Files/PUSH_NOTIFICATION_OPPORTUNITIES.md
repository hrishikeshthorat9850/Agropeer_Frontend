# Push Notification Opportunities Analysis

## ✅ Already Implemented
1. **Chat Messages** - ✅ Done (sends when recipient is offline)
2. **Weather Alerts** - ✅ Done (rate limited to 3/day)

---

## 🔔 High Priority - Social Interactions

### 1. **Post Comments** ⭐⭐⭐
**File:** `app/api/post-comment/route.js`
- **When:** Someone comments on a user's post
- **Recipient:** Post owner (if commenter is not the owner)
- **Notification:** 
  - Title: "New comment on your post"
  - Body: "[Commenter Name]: [Comment preview]"
  - Link: `/posts/[post_id]`
- **Note:** Also check for replies to comments (`parent_comment_id` exists)

### 2. **Comment Replies** ⭐⭐⭐
**File:** `app/api/post-comment/route.js`
- **When:** Someone replies to a user's comment
- **Recipient:** Original comment author
- **Notification:**
  - Title: "[User] replied to your comment"
  - Body: "[Reply text]"
  - Link: `/posts/[post_id]`

### 3. **Post Likes** ⭐⭐
**File:** `app/api/posts/[id]/like/route.js`
- **When:** Someone likes a user's post
- **Recipient:** Post owner (if liker is not the owner)
- **Notification:**
  - Title: "[User] liked your post"
  - Body: "[Post title/content preview]"
  - Link: `/posts/[post_id]`
- **Consideration:** May want to batch multiple likes (e.g., "5 people liked your post")

### 4. **Comment Likes** ⭐⭐
**File:** `app/api/comments/[id]/like/route.js`
- **When:** Someone likes a user's comment
- **Recipient:** Comment author (if liker is not the author)
- **Notification:**
  - Title: "[User] liked your comment"
  - Body: "[Comment preview]"
  - Link: `/posts/[post_id]`

---

## 🛒 Medium Priority - Product/Marketplace

### 5. **Product Reviews** ⭐⭐
**File:** `app/api/reviews/route.js`
- **When:** Someone reviews a product
- **Recipient:** Product owner
- **Notification:**
  - Title: "New review on your product"
  - Body: "[Reviewer] rated [Rating] stars"
  - Link: `/products/[product_id]`

### 6. **Product Favorites** ⭐
**File:** `app/api/user-favorites/route.js` (when product_id is set)
- **When:** Someone favorites a user's product
- **Recipient:** Product owner
- **Notification:**
  - Title: "[User] favorited your product"
  - Body: "[Product name]"
  - Link: `/products/[product_id]`

### 7. **Product Inquiry/Chat** ⭐⭐⭐
**File:** `server/server.js` (chat system)
- **When:** Someone starts a conversation about a product
- **Recipient:** Product owner
- **Notification:**
  - Title: "New inquiry about [Product Name]"
  - Body: "[Buyer] sent a message"
  - Link: `/chats?conversation=[conversation_id]`
- **Note:** This might already be covered by chat notifications, but could be enhanced with product context

---

## 📰 Low Priority - Content Updates

### 8. **New Posts from Followed Users** ⭐
**File:** `app/api/posts/route.js` (POST method if exists)
- **When:** A followed user creates a new post
- **Recipient:** Followers
- **Notification:**
  - Title: "[User] posted something new"
  - Body: "[Post preview]"
  - Link: `/posts/[post_id]`
- **Note:** Requires follow system implementation

### 9. **New News Articles** ⭐
**File:** `app/api/news/route.js` (POST method if exists)
- **When:** Admin publishes new news article
- **Recipient:** All users (or users who favorited news category)
- **Notification:**
  - Title: "📰 New Article: [Title]"
  - Body: "[Summary]"
  - Link: `/news/[article_id]`
- **Consideration:** May want to batch daily digest instead

### 10. **New Government Schemes** ⭐
**File:** `app/api/government-schemes/route.js` (POST method if exists)
- **When:** Admin adds new government scheme
- **Recipient:** All users (or users who favorited schemes)
- **Notification:**
  - Title: "🏛️ New Government Scheme"
  - Body: "[Scheme Name]"
  - Link: `/government-schemes/[scheme_id]`

### 11. **Market Price Updates** ⭐
**File:** `app/api/market-prices/route.js` or `app/api/get-market-prices/route.js`
- **When:** Significant price change for a crop/product user is interested in
- **Recipient:** Users who favorited that product/crop
- **Notification:**
  - Title: "💰 Price Update: [Crop Name]"
  - Body: "Price changed to ₹[new_price]"
  - Link: `/market-prices`

---

## 🔔 System/Account Notifications

### 12. **Account Activity** ⭐
- **When:** Login from new device, password change, etc.
- **Recipient:** User
- **Notification:**
  - Title: "🔒 Security Alert"
  - Body: "New login detected from [device/location]"
  - Link: `/settings`

### 13. **Post/Product Approval** ⭐⭐
- **When:** Admin approves/rejects user's post or product
- **Recipient:** Post/Product creator
- **Notification:**
  - Title: "Your [post/product] was [approved/rejected]"
  - Body: "[Reason if rejected]"
  - Link: `/profile` or `/posts/[id]`

---

## 📊 Summary by Priority

### High Priority (Implement First)
1. ✅ Chat Messages - **DONE**
2. ✅ Weather Alerts - **DONE**
3. ⚠️ Post Comments - **NEEDED**
4. ⚠️ Comment Replies - **NEEDED**
5. ⚠️ Product Inquiries (via chat) - **PARTIALLY DONE** (chat notifications exist, but could add product context)

### Medium Priority (Implement Next)
6. Post Likes
7. Comment Likes
8. Product Reviews
9. Product Favorites

### Low Priority (Nice to Have)
10. New Posts from Followed Users
11. New News Articles
12. New Government Schemes
13. Market Price Updates
14. Account Activity
15. Post/Product Approval

---

## 🎯 Recommended Implementation Order

1. **Post Comments** - Most engaging, users want to know when someone comments
2. **Comment Replies** - Important for conversation threads
3. **Post Likes** - Social validation, but consider batching
4. **Comment Likes** - Similar to post likes
5. **Product Reviews** - Important for sellers
6. **Product Favorites** - Less urgent but useful

---

## 💡 Implementation Notes

### Batching Considerations
- **Likes:** Consider batching multiple likes (e.g., "5 people liked your post")
- **Comments:** Usually send individually (more important)
- **News/Updates:** Consider daily digest instead of individual notifications

### Rate Limiting
- **Social interactions:** No rate limit needed (user-initiated)
- **System updates:** Consider rate limiting (e.g., max 10/day for news)

### User Preferences
- Consider adding notification preferences in user settings
- Allow users to opt-in/opt-out of different notification types

### Database Requirements
- May need a `notifications` table to track sent notifications
- Consider `notification_preferences` table for user settings

---

## 🔍 Files to Check for Implementation

### API Routes (Add notification sending)
- `app/api/post-comment/route.js` - Comments & Replies
- `app/api/posts/[id]/like/route.js` - Post Likes
- `app/api/comments/[id]/like/route.js` - Comment Likes
- `app/api/reviews/route.js` - Product Reviews
- `app/api/user-favorites/route.js` - Product Favorites

### Database Queries Needed
- Get post owner from `post_id`
- Get comment author from `comment_id`
- Get product owner from `product_id`
- Check if user wants notifications (preferences)

---

## ✅ Next Steps

1. Review this list and prioritize
2. Implement notification service calls in identified API routes
3. Add user notification preferences
4. Test each notification type
5. Monitor notification delivery rates

