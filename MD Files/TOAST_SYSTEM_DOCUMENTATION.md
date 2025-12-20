# Toast System Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Installation & Setup](#installation--setup)
4. [Basic Usage](#basic-usage)
5. [API Reference](#api-reference)
6. [Advanced Features](#advanced-features)
7. [Platform Support](#platform-support)
8. [Customization](#customization)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

---

## Overview

The Toast System is a modern, unified notification system designed for both web and Android Capacitor applications. It provides a consistent user experience across platforms with agricultural-themed icons and smooth animations.

### Key Features

- 🌾 **Agricultural Theme**: Contextual icons (🌾 for success, ⚠️ for errors, etc.)
- 📱 **Cross-Platform**: Works on web and Android Capacitor apps
- 🎨 **Modern UI**: Beautiful gradients, animations, and progress indicators
- 🔄 **Queue Management**: Handles multiple toasts intelligently
- ♿ **Accessible**: ARIA labels and semantic HTML
- ⚡ **Performance**: Optimized with Framer Motion animations
- 🎯 **Type-Safe**: Supports TypeScript (with JSDoc)

---

## Architecture

The toast system consists of several key components:

```
┌─────────────────────────────────────────┐
│         ToastProvider (Context)         │
│  - Manages global toast state          │
│  - Provides showToast API              │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
┌───────▼────────┐  ┌───────▼──────────┐
│  ToastQueue    │  │ ToastContainer    │
│  - Queue mgmt  │  │ - Renders toasts  │
│  - Max limit   │  │ - Positioning     │
└────────────────┘  └────────┬──────────┘
                              │
                     ┌────────▼────────┐
                     │     Toast       │
                     │  - Individual   │
                     │  - Animation    │
                     │  - Auto-dismiss │
                     └─────────────────┘
```

### Component Structure

1. **ToastContext** (`Context/ToastContext.jsx`)
   - Global state management
   - Provides `showToast` function
   - Platform detection

2. **ToastQueue** (`lib/toast/toastQueue.js`)
   - Manages toast queue (max 5 by default)
   - Subscriber pattern for updates
   - Auto-removes oldest when queue is full

3. **ToastContainer** (`components/ui/toast/ToastContainer.jsx`)
   - Renders all active toasts
   - Handles positioning (top-right, bottom-left, etc.)
   - Limits visible toasts

4. **Toast** (`components/ui/toast/Toast.jsx`)
   - Individual toast component
   - Progress bar animation
   - Auto-dismiss logic
   - Action buttons support

5. **ToastIcon** (`components/ui/toast/ToastIcon.jsx`)
   - Agricultural-themed icons
   - Contextual emoji mapping

6. **ToastAdapter** (`lib/toast/toastAdapter.js`)
   - Platform detection (web vs Android)
   - Native toast integration (Capacitor)

---

## Installation & Setup

### Prerequisites

The toast system is already integrated into the application. Ensure you have:

- React 18+
- Next.js 13+ (App Router)
- Framer Motion
- Tailwind CSS

### Setup Steps

1. **ToastProvider is already added** in `app/AppProviders.jsx`:
```jsx
import { ToastProvider } from "@/Context/ToastContext";

export default function AppProviders({ children }) {
  return (
    <LoginProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </LoginProvider>
  );
}
```

2. **ToastContainer is already added** in `app/LayoutClient.jsx`:
```jsx
import { ToastContainer } from "@/components/ui/toast/ToastContainer";

export default function ClientLayout({ children }) {
  return (
    <AppProviders>
      {children}
      <ToastContainer />
    </AppProviders>
  );
}
```

3. **Use the hook** in any component:
```jsx
import useToast from "@/hooks/useToast";

function MyComponent() {
  const { showToast } = useToast();
  // Use showToast here
}
```

---

## Basic Usage

### Simple Toast

```jsx
import useToast from "@/hooks/useToast";

function MyComponent() {
  const { showToast } = useToast();

  const handleClick = () => {
    showToast("success", "Operation completed successfully! 🌾");
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

### Toast Types

```jsx
const { showToast, success, error, info, warning } = useToast();

// Method 1: Using showToast with type
showToast("success", "Saved successfully!");
showToast("error", "Something went wrong!");
showToast("info", "New update available");
showToast("warning", "Please check your input");

// Method 2: Using convenience methods
success("Saved successfully!");
error("Something went wrong!");
info("New update available");
warning("Please check your input");
```

### Object Syntax

```jsx
showToast({
  type: "success",
  message: "Profile updated!",
  duration: 5000,
  position: "top-right"
});
```

---

## API Reference

### `showToast(typeOrOptions, message?)`

Main function to display a toast notification.

#### Parameters

**Method 1: String Type + Message**
```jsx
showToast(type: string, message: string)
```

- `type` (string): Toast type - `"success"`, `"error"`, `"info"`, `"warning"`, `"network"`
- `message` (string): Toast message to display

**Method 2: Options Object**
```jsx
showToast(options: ToastOptions)
```

#### ToastOptions

```typescript
interface ToastOptions {
  type?: "success" | "error" | "info" | "warning" | "network"; // Default: "info"
  message: string; // Required
  duration?: number; // Default: 3000ms
  position?: "top" | "top-right" | "top-left" | "bottom" | "bottom-right" | "bottom-left"; // Default: "top-right"
  showIcon?: boolean; // Default: true
  showCloseButton?: boolean; // Default: true
  persistent?: boolean; // Default: false - if true, toast won't auto-dismiss
  useNativeToast?: boolean; // Default: false - use native Android toast on Capacitor
  action?: {
    label: string;
    onClick: () => void;
    dismissOnClick?: boolean; // Default: true
  };
  onDismiss?: (id: string) => void; // Callback when toast is dismissed
}
```

#### Returns

Returns a `toastId` (string) that can be used to programmatically remove the toast.

### Convenience Methods

```jsx
const { success, error, info, warning } = useToast();

// All accept (message: string, options?: Partial<ToastOptions>)
success("Operation successful!", { duration: 5000 });
error("Failed to save", { persistent: true });
info("New feature available");
warning("Check your input");
```

### Other Methods

```jsx
const { removeToast, clearToasts, isAndroid } = useToast();

// Remove specific toast
const toastId = showToast("info", "Processing...");
removeToast(toastId);

// Clear all toasts
clearToasts();

// Check if running on Android
if (isAndroid) {
  // Android-specific logic
}
```

---

## Advanced Features

### Persistent Toasts

Toasts that don't auto-dismiss:

```jsx
showToast({
  type: "error",
  message: "Critical error occurred!",
  persistent: true, // Won't auto-dismiss
  showCloseButton: true // User must manually close
});
```

### Action Buttons

Add interactive buttons to toasts:

```jsx
showToast({
  type: "info",
  message: "New version available",
  action: {
    label: "Update Now",
    onClick: () => {
      window.location.href = "/update";
    },
    dismissOnClick: true // Toast closes when button is clicked
  }
});
```

### Custom Duration

```jsx
showToast({
  type: "success",
  message: "File uploaded",
  duration: 5000 // 5 seconds
});
```

### Position Control

```jsx
showToast({
  type: "info",
  message: "Notification",
  position: "bottom-left" // Options: top, top-right, top-left, bottom, bottom-right, bottom-left
});
```

### Callback on Dismiss

```jsx
showToast({
  type: "success",
  message: "Saved!",
  onDismiss: (toastId) => {
    console.log("Toast dismissed:", toastId);
    // Perform cleanup or follow-up actions
  }
});
```

### Programmatic Dismissal

```jsx
const toastId = showToast("info", "Processing...");

// Later, remove it programmatically
removeToast(toastId);
```

---

## Platform Support

### Web Platform

On web, toasts render as custom React components with:
- Framer Motion animations
- Tailwind CSS styling
- Progress bar indicators
- Click-to-dismiss functionality

### Android Capacitor

On Android (when using Capacitor), you can optionally use native Android toasts:

```jsx
showToast({
  type: "success",
  message: "Saved!",
  useNativeToast: true // Uses native Android toast
});
```

**Note**: Native toasts have limited customization but provide a native Android experience.

### Platform Detection

```jsx
const { isAndroid } = useToast();

if (isAndroid) {
  // Android-specific logic
  showToast({
    message: "Android-specific message",
    useNativeToast: true
  });
} else {
  // Web-specific logic
  showToast("success", "Web message");
}
```

---

## Customization

### Toast Types & Icons

Current icon mapping (in `components/ui/toast/ToastIcon.jsx`):

```jsx
const iconMap = {
  success: "🌾", // Harvest icon
  error: "⚠️",   // Warning icon
  info: "💡",    // Lightbulb icon
  warning: "🌧️", // Weather warning
  network: "📡", // Connection icon
};
```

To customize icons, edit `components/ui/toast/ToastIcon.jsx`.

### Colors

Toast colors are defined in `components/ui/toast/Toast.jsx`:

```jsx
const colorMap = {
  success: {
    bg: "bg-gradient-to-r from-green-600 to-green-700",
    border: "border-green-500",
    text: "text-white",
  },
  error: {
    bg: "bg-gradient-to-r from-red-600 to-red-700",
    border: "border-red-500",
    text: "text-white",
  },
  // ... other types
};
```

### Max Queue Size

Default is 5 toasts. To change:

```jsx
// In Context/ToastContext.jsx
const toastQueue = new ToastQueue(10); // Change to 10
```

### Container Position

Change default position in `app/LayoutClient.jsx`:

```jsx
<ToastContainer position="bottom-left" maxToasts={5} />
```

Available positions:
- `"top"`
- `"top-right"` (default)
- `"top-left"`
- `"bottom"`
- `"bottom-right"`
- `"bottom-left"`

---

## Best Practices

### 1. Use Appropriate Types

```jsx
// ✅ Good
success("Data saved successfully!");
error("Failed to connect to server");
warning("Password is too weak");
info("New features available");

// ❌ Avoid
showToast("success", "Error occurred"); // Wrong type
```

### 2. Keep Messages Concise

```jsx
// ✅ Good
showToast("success", "Saved!");

// ❌ Avoid
showToast("success", "Your data has been successfully saved to the database and is now available for viewing.");
```

### 3. Use Persistent Toasts for Critical Errors

```jsx
// ✅ Good - Critical error that needs user attention
showToast({
  type: "error",
  message: "Payment failed. Please try again.",
  persistent: true
});

// ✅ Good - Success message can auto-dismiss
showToast("success", "Payment successful!");
```

### 4. Provide Action Buttons for Important Notifications

```jsx
// ✅ Good - User can take immediate action
showToast({
  type: "info",
  message: "Update available",
  action: {
    label: "Update Now",
    onClick: () => router.push("/update")
  }
});
```

### 5. Handle Errors Gracefully

```jsx
try {
  await saveData();
  showToast("success", "Saved successfully!");
} catch (error) {
  showToast("error", error.message || "Failed to save. Please try again.");
}
```

### 6. Don't Overuse Toasts

```jsx
// ❌ Avoid - Too many toasts
showToast("info", "Loading...");
showToast("info", "Processing...");
showToast("info", "Almost done...");
showToast("success", "Done!");

// ✅ Better - Use loading states or single toast
showToast("info", "Processing your request...");
// ... do work ...
showToast("success", "Done!");
```

---

## Troubleshooting

### Toast Not Appearing

1. **Check ToastProvider**: Ensure `ToastProvider` wraps your app in `AppProviders.jsx`
2. **Check ToastContainer**: Ensure `<ToastContainer />` is in `LayoutClient.jsx`
3. **Check Hook Usage**: Ensure you're using `useToast()` hook correctly
4. **Check Console**: Look for errors in browser console

### Toast Appearing in Wrong Position

Check the `position` prop in `ToastContainer`:
```jsx
<ToastContainer position="top-right" />
```

### Toasts Not Auto-Dismissing

Check if `persistent` is set to `true`:
```jsx
showToast({
  type: "info",
  message: "Test",
  persistent: false // Should be false for auto-dismiss
});
```

### Native Toast Not Working on Android

1. Ensure Capacitor Toast plugin is installed:
```bash
npm install @capacitor/toast
npx cap sync
```

2. Check if platform is detected:
```jsx
const { isAndroid } = useToast();
console.log("Is Android:", isAndroid);
```

3. Ensure `useNativeToast: true` is set:
```jsx
showToast({
  message: "Test",
  useNativeToast: true
});
```

### Multiple Toasts Not Showing

Check queue limit:
```jsx
// In ToastContext.jsx
const toastQueue = new ToastQueue(5); // Increase if needed
```

### Styling Issues

Ensure Tailwind CSS is properly configured and includes the toast component classes.

---

## Examples

### Form Submission

```jsx
async function handleSubmit(formData) {
  try {
    setLoading(true);
    await submitForm(formData);
    showToast("success", "Form submitted successfully! 🌾");
    router.push("/success");
  } catch (error) {
    showToast("error", error.message || "Failed to submit form");
  } finally {
    setLoading(false);
  }
}
```

### File Upload

```jsx
async function handleFileUpload(file) {
  const toastId = showToast("info", "Uploading file...", { persistent: true });
  
  try {
    await uploadFile(file);
    removeToast(toastId);
    showToast("success", "File uploaded successfully! 📁");
  } catch (error) {
    removeToast(toastId);
    showToast("error", "Upload failed. Please try again.");
  }
}
```

### Network Status

```jsx
useEffect(() => {
  const handleOnline = () => {
    showToast("success", "Connection restored! 🌐");
  };
  
  const handleOffline = () => {
    showToast({
      type: "network",
      message: "No internet connection",
      persistent: true
    });
  };
  
  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);
  
  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
}, []);
```

### Confirmation Toast

```jsx
function handleDelete(item) {
  showToast({
    type: "warning",
    message: `Delete ${item.name}?`,
    action: {
      label: "Delete",
      onClick: async () => {
        await deleteItem(item.id);
        showToast("success", "Deleted successfully!");
      },
      dismissOnClick: true
    },
    persistent: true
  });
}
```

---

## Migration Guide

### From Old Alert System

**Before:**
```jsx
alert("Operation successful!");
```

**After:**
```jsx
const { showToast } = useToast();
showToast("success", "Operation successful!");
```

### From Material-UI Alerts

**Before:**
```jsx
import Alert from '@mui/material/Alert';
<Alert severity="success">Success!</Alert>
```

**After:**
```jsx
const { showToast } = useToast();
showToast("success", "Success!");
```

### From Custom Toast Components

**Before:**
```jsx
const [toast, setToast] = useState({ show: false, message: "" });
// ... custom toast logic
```

**After:**
```jsx
const { showToast } = useToast();
showToast("success", "Message");
// No need to manage state - handled globally
```

---

## Contributing

When adding new features to the toast system:

1. **Update ToastContext** for new options
2. **Update Toast component** for UI changes
3. **Update ToastIcon** for new icon types
4. **Update this documentation**
5. **Test on both web and Android**

---

## License

Part of the Agrogram project.

---

## Support

For issues or questions:
1. Check this documentation
2. Review the code in `Context/ToastContext.jsx`
3. Check browser console for errors
4. Verify ToastProvider and ToastContainer are properly set up

---

**Last Updated**: 2024
**Version**: 1.0.0

