# Android Page Layout Guide

This guide explains how to use the cleaned layout system for all pages in the Capacitor Android app.

## 📋 Overview

The layout system automatically handles:
- ✅ Consistent spacing for navbar and bottom navigation
- ✅ Safe area insets (notches, status bar, home indicator)
- ✅ Proper padding for all pages
- ✅ Full-screen support for auth pages
- ✅ Scrollable content areas

## 🎯 Components

### 1. `MobilePageLayout` (Automatic)
Automatically wraps all mobile pages when running in Capacitor Android. You don't need to manually add it.

**Features:**
- Handles padding for navbar (top) and bottom nav (bottom)
- Respects safe area insets
- Full-screen mode for auth pages
- Consistent background colors

### 2. `MobilePageContainer` (Optional)
Use this to wrap your page content for consistent horizontal padding.

```jsx
import MobilePageContainer from "@/components/mobile/MobilePageContainer";

export default function MyPage() {
  return (
    <MobilePageContainer>
      <h1>My Page Title</h1>
      <p>Page content here...</p>
    </MobilePageContainer>
  );
}
```

**Props:**
- `className` - Additional CSS classes
- `fullWidth` - Remove max-width constraints (default: false)
- `noPadding` - Remove horizontal padding (default: false)

## 📱 Page Structure Examples

### Standard Page (with padding)
```jsx
"use client";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";

export default function MyPage() {
  return (
    <MobilePageContainer>
      <div className="py-4">
        <h1 className="text-2xl font-bold mb-4">Page Title</h1>
        <p>Content goes here...</p>
      </div>
    </MobilePageContainer>
  );
}
```

### Full-Width Page (no horizontal padding)
```jsx
"use client";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";

export default function FullWidthPage() {
  return (
    <MobilePageContainer noPadding>
      <div className="w-full">
        {/* Full-width content like images, carousels */}
      </div>
    </MobilePageContainer>
  );
}
```

### Page with Custom Background
```jsx
"use client";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";

export default function CustomBgPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <MobilePageContainer>
        <div className="py-6">
          <h1>Custom Background Page</h1>
        </div>
      </MobilePageContainer>
    </div>
  );
}
```

## 🎨 Layout Behavior

### Automatic Padding
The layout automatically adds:
- **Top padding**: `56px + safe-area-inset-top` (for navbar)
- **Bottom padding**: `70px + safe-area-inset-bottom` (for bottom nav)

### Routes with No Padding
These routes automatically get full-screen (no padding):
- `/login`
- `/signup`
- `/register`
- `/admin/login`
- `/forgot-password`
- `/reset-password`
- `/auth/callback`

### Routes with No UI
These routes hide navbar and bottom nav:
- `/login`
- `/signup`
- `/register`
- `/admin/login`
- `/forgot-password`
- `/reset-password`

## 📐 Safe Area Insets

The layout automatically handles:
- **Status bar**: Uses `env(safe-area-inset-top)`
- **Home indicator**: Uses `env(safe-area-inset-bottom)`
- **Notches**: Automatically accounted for

## 🔧 Customization

### Override Layout for Specific Page
If you need custom layout behavior, you can check the pathname:

```jsx
"use client";
import { usePathname } from "next/navigation";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";

export default function CustomPage() {
  const pathname = usePathname();
  
  return (
    <div className={pathname === "/special" ? "custom-class" : ""}>
      <MobilePageContainer>
        {/* Content */}
      </MobilePageContainer>
    </div>
  );
}
```

## ✅ Best Practices

1. **Always use `MobilePageContainer`** for consistent horizontal padding
2. **Use `noPadding` prop** for full-width elements (images, videos, carousels)
3. **Add vertical padding** inside containers: `py-4`, `py-6`, etc.
4. **Test on real devices** to verify safe area insets work correctly
5. **Keep content scrollable** - don't use fixed heights that might cut off content

## 🐛 Troubleshooting

### Content hidden behind navbar/bottom nav
- Ensure you're using `MobilePageLayout` (automatic) or proper padding
- Check that your page isn't overriding the layout classes

### Safe area insets not working
- Test on a real device (emulators may not show safe areas correctly)
- Verify Capacitor is properly configured

### Full-width content not working
- Use `MobilePageContainer` with `noPadding` prop
- Or use `fullWidth` prop for container

## 📝 Example: Complete Page

```jsx
"use client";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";
import { useState } from "react";

export default function ExamplePage() {
  const [data, setData] = useState([]);

  return (
    <MobilePageContainer>
      {/* Header Section */}
      <div className="py-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Page Title
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Page description
        </p>
      </div>

      {/* Content Section */}
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg p-4">
            {/* Item content */}
          </div>
        ))}
      </div>

      {/* Full-width image example */}
      <MobilePageContainer noPadding className="mt-6">
        <img 
          src="/example.jpg" 
          alt="Example" 
          className="w-full h-auto rounded-lg"
        />
      </MobilePageContainer>
    </MobilePageContainer>
  );
}
```

## 🚀 Migration Guide

### Before (Old Layout)
```jsx
export default function OldPage() {
  return (
    <div className="w-full min-h-screen pt-20 pb-24 px-4">
      {/* Content */}
    </div>
  );
}
```

### After (New Layout)
```jsx
import MobilePageContainer from "@/components/mobile/MobilePageContainer";

export default function NewPage() {
  return (
    <MobilePageContainer>
      <div className="py-4">
        {/* Content */}
      </div>
    </MobilePageContainer>
  );
}
```

The `MobilePageLayout` wrapper is automatically applied, so you don't need to add it manually!

