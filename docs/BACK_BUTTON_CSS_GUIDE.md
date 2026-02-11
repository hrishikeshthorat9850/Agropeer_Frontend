# Back Button & Transitions Guide

Quick reference for customizing **back transition animation** (page slide/fade) and **back button UI** (the arrow/button you tap).

---

## Overview

| Customize | What it controls | Where |
|-----------|-------------------|--------|
| **Transition** | How the page animates when you go back (slide right, fade, duration) | `app/globals.css` → `SMOOTH BACK TRANSITIONS` |
| **Button UI** | The back arrow/button look and tap feel (size, color, shape) | Per-page Tailwind or a shared CSS class |

**Current behavior (back flow):** Exit animation runs and **finishes** → `history.back()` → Enter animation runs on the previous page. Duration is **200ms** for a snappy Android feel.

---

## 1. Back transition (page animation)

**File:** `app/globals.css`  
**Section:** `🔙 SMOOTH BACK TRANSITIONS` (search for that comment).

The JS in `utils/backTransition.js` only applies the classes; the **animation** is defined in CSS.

| What to change | CSS target | Controls |
|----------------|------------|----------|
| Exit motion | `@keyframes back-exit` | How the current page leaves (e.g. slide right, fade, scale) |
| Enter motion | `@keyframes back-enter` | How the previous page appears (e.g. slide in from left) |
| Exit duration & easing | `.back-transition-exit` | Duration (e.g. `200ms`), `animation-timing-function` |
| Enter duration & easing | `.back-transition-enter` | Same for the enter animation |
| Mobile timing | `@media (max-width: 768px)` | Shorter duration on small screens (optional) |
| Accessibility | `@media (prefers-reduced-motion: reduce)` | Disables animation when user prefers reduced motion |

**Tip:** Keep exit and enter durations the same (e.g. 200ms) and use `cubic-bezier(0.32, 0.72, 0, 1)` for a smooth, native feel.

---

## 2. Back button UI (the arrow/button)

There is **no single CSS file** for the back button. Each screen styles its own with **Tailwind** (or you can introduce a shared class).

### Where the back button lives

| Screen / component | File | What to edit |
|--------------------|------|--------------|
| Profile (desktop) | `app/profile/page.jsx` | Button `className` (~line 140) |
| Profile (header) | `app/profile/page.jsx` | Button + `<ArrowLeft size={24} />` (~line 172) |
| Profile edit | `app/profile/edit/page.jsx` | Button + `<ArrowLeft />` (~line 149) |
| Help | `app/help/page.jsx` | Button + `<ArrowLeft />` (~line 66) |
| Market prices | `app/market-prices/page.jsx` | `w-10 h-10 rounded-full ... active:scale-90` (~line 218) |
| News (article) | `app/news/page.jsx` | `w-10 h-10 rounded-full bg-white/20 ... active:scale-95` (~line 258) |
| Milk rate calculator | `app/milk-rate-calculator/page.jsx` | Button + `<FaArrowLeft />` (~line 271) |
| Government schemes (detail) | `app/government-schemes/page.jsx` | Button + `<FaArrowLeft />` (~line 259) |
| AI Chat window | `components/chatbot/AIChatWindow.jsx` | `FaArrowLeft size={15}` (~line 250) |
| Chat header | `components/chat/ChatHeader.jsx` | `<FaChevronLeft />` + parent button (~line 61) |

### Making the back button consistent

**Option A – Shared CSS class**

1. In `app/globals.css`, add a class (e.g. `.back-button-ui`) with size, padding, radius, colors, hover, and `active` state.
2. Use it on each back button: `className="back-button-ui ..."` and remove duplicate Tailwind.

**Option B – Tailwind only**

- Edit each back button’s `className` and icon size until look and tap feel (e.g. `active:scale-95`) match across screens.

---

## Quick reference

| Goal | Where |
|------|--------|
| **Transition feel** (slide/fade when going back) | `app/globals.css` → `SMOOTH BACK TRANSITIONS` → `back-exit`, `back-enter`, `.back-transition-exit`, `.back-transition-enter` |
| **Button look/feel** (arrow, size, hover, tap) | Each file in the table above; or add `.back-button-ui` in `globals.css` and use it everywhere |

---

## Related behavior

- **Home button:** Tapping Home when already on home does nothing (no navigation), so the screen doesn’t fluctuate. See `components/mobile/MobileBottomNav.jsx`.
- **Back logic:** Handled in `components/mobile/AppShell.jsx` (Capacitor `backButton`) and `utils/backTransition.js` (exit → back → enter).
