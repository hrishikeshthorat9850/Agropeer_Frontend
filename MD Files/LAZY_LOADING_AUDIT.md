# Lazy Loading Audit Report

## TASK 1 — Existing Lazy Loading Audit

### ✅ Already-Correct Lazy-Loaded Components

1. **`app/market-prices/page.jsx`**
   - `MarketList` - Correctly lazy loaded with `dynamic()` and `ssr: false`
   - Has proper loading fallback UI
   - ✅ **Status: CORRECT**

2. **`components/chat/ChatInputComposer.jsx`**
   - `EmojiPicker` from `emoji-picker-react` - Correctly lazy loaded with `ssr: false`
   - Has loading fallback
   - ✅ **Status: CORRECT**

### ⚠️ Incorrect/Incomplete Lazy Loading Usages

**None found** - Existing lazy loading implementations follow Next.js best practices.

### 📋 Components That SHOULD Be Lazy Loaded

#### Heavy/Non-Critical Components:
1. **`ChatModal`** - Large component with socket connections, only shown on user interaction
   - Used in: `app/market/page.jsx`, `app/market/[id]/page.jsx`
   - Should lazy load with `ssr: false` (browser-only)

2. **`SellForm`** - Heavy form component, only shown in edit modal
   - Used in: `app/market/page.jsx`, `app/sell/selected/[category]/page.jsx`
   - Should lazy load

3. **`AdPost`** - Advertisement component, non-critical
   - Used in: `app/market/page.jsx`
   - Should lazy load

4. **`AdBanner`** - Advertisement component, non-critical
   - Used in: `app/market/page.jsx`
   - Should lazy load

5. **`PopupModal`** - Admin-only popup component
   - Used in: `app/home/page.jsx` (commented out)
   - Should lazy load with conditional rendering

6. **`PopupForm`** - Admin-only form component
   - Used in: `app/home/page.jsx` (commented out)
   - Should lazy load with conditional rendering

7. **`StoryFormModal`** - Modal with RichTextEditor
   - Used in: `app/farmer-story/page.jsx`
   - Should lazy load

8. **`RichTextEditor`** - Heavy editor component
   - Used in: `components/StoryFormModal.jsx`
   - Should lazy load with `ssr: false`

9. **`ClientModalWrapper`** - Edit post modal wrapper
   - Used in: `app/posts/[id]/page.jsx`
   - Should lazy load (only needed when `?edit=true`)

10. **`NewsletterSignup`** - Below-the-fold component
    - Used in: `app/home/page.jsx`
    - Should lazy load

11. **`FeaturedPosts`** - Below-the-fold component
    - Used in: `app/home/page.jsx`
    - Should lazy load

#### Components Behind User Interactions:
- Modals (ChatModal, EditPostModal via ClientModalWrapper)
- Forms (SellForm, StoryFormModal)
- Admin components (PopupModal, PopupForm)

### ❌ Components That Should NOT Be Lazy Loaded

- Layout components
- Core providers/contexts
- Essential above-the-fold content (HeroSection, QuickActionCards)
- Core UI components used on every page
- PostCard (core functionality)
- LoadingSpinner, ErrorBoundary (critical infrastructure)

---

## TASK 2 — Implementation Plan

### Priority 1: Heavy Modal Components
- ChatModal
- SellForm (in edit modal)
- StoryFormModal
- ClientModalWrapper

### Priority 2: Advertisement Components
- AdPost
- AdBanner

### Priority 3: Below-the-Fold Components
- NewsletterSignup
- FeaturedPosts

### Priority 4: Admin Components
- PopupModal
- PopupForm

### Priority 5: Heavy Libraries
- RichTextEditor

---

## TASK 3 — Files to Refactor

1. `app/market/page.jsx`
2. `app/market/[id]/page.jsx`
3. `app/home/page.jsx`
4. `app/posts/[id]/page.jsx`
5. `app/farmer-story/page.jsx`
6. `components/StoryFormModal.jsx`
7. `app/sell/selected/[category]/page.jsx`

