# Toast System - Quick Reference Guide

## Quick Start

```jsx
import useToast from "@/hooks/useToast";

function MyComponent() {
  const { showToast } = useToast();
  
  // Basic usage
  showToast("success", "Saved!");
}
```

## Common Patterns

### Success Messages
```jsx
showToast("success", "Operation completed! 🌾");
// or
success("Operation completed!");
```

### Error Messages
```jsx
showToast("error", "Something went wrong!");
// or
error("Something went wrong!");
```

### Info Messages
```jsx
showToast("info", "New update available");
// or
info("New update available");
```

### Warning Messages
```jsx
showToast("warning", "Please check your input");
// or
warning("Please check your input");
```

## Advanced Usage

### Persistent Toast (No Auto-Dismiss)
```jsx
showToast({
  type: "error",
  message: "Critical error!",
  persistent: true
});
```

### Toast with Action Button
```jsx
showToast({
  type: "info",
  message: "Update available",
  action: {
    label: "Update Now",
    onClick: () => router.push("/update")
  }
});
```

### Custom Duration
```jsx
showToast({
  type: "success",
  message: "Saved!",
  duration: 5000 // 5 seconds
});
```

### Different Position
```jsx
showToast({
  type: "info",
  message: "Notification",
  position: "bottom-left"
});
```

### Programmatic Dismissal
```jsx
const toastId = showToast("info", "Processing...");
// Later...
removeToast(toastId);
```

## Toast Types

| Type | Icon | Use Case |
|------|------|----------|
| `success` | 🌾 | Successful operations, confirmations |
| `error` | ⚠️ | Errors, failures, critical issues |
| `info` | 💡 | General information, updates |
| `warning` | 🌧️ | Warnings, cautions |
| `network` | 📡 | Network-related messages |

## Positions

- `"top"` - Top center
- `"top-right"` - Top right (default)
- `"top-left"` - Top left
- `"bottom"` - Bottom center
- `"bottom-right"` - Bottom right
- `"bottom-left"` - Bottom left

## Common Use Cases

### Form Submission
```jsx
try {
  await submitForm();
  showToast("success", "Form submitted!");
} catch (error) {
  showToast("error", "Submission failed");
}
```

### File Upload
```jsx
const toastId = showToast("info", "Uploading...", { persistent: true });
try {
  await uploadFile();
  removeToast(toastId);
  showToast("success", "Uploaded!");
} catch (error) {
  removeToast(toastId);
  showToast("error", "Upload failed");
}
```

### Copy to Clipboard
```jsx
navigator.clipboard.writeText(text);
showToast("success", "Copied to clipboard! 📋");
```

### Delete Confirmation
```jsx
showToast({
  type: "warning",
  message: "Delete this item?",
  action: {
    label: "Delete",
    onClick: () => deleteItem(),
    dismissOnClick: true
  },
  persistent: true
});
```

## API Summary

### Main Function
```jsx
showToast(type: string, message: string)
showToast(options: ToastOptions)
```

### Convenience Methods
```jsx
success(message, options?)
error(message, options?)
info(message, options?)
warning(message, options?)
```

### Other Methods
```jsx
removeToast(toastId: string)
clearToasts()
isAndroid: boolean
```

## Options Object

```typescript
{
  type?: "success" | "error" | "info" | "warning" | "network",
  message: string,
  duration?: number, // Default: 3000ms
  position?: string, // Default: "top-right"
  persistent?: boolean, // Default: false
  showIcon?: boolean, // Default: true
  showCloseButton?: boolean, // Default: true
  action?: {
    label: string,
    onClick: () => void,
    dismissOnClick?: boolean
  },
  onDismiss?: (id: string) => void,
  useNativeToast?: boolean // For Android Capacitor
}
```

## Tips

✅ **Do:**
- Use appropriate toast types
- Keep messages concise
- Use persistent toasts for critical errors
- Provide action buttons for important notifications

❌ **Don't:**
- Overuse toasts (use loading states instead)
- Use wrong types (e.g., success for errors)
- Create overly long messages
- Show multiple toasts for the same action

## See Also

- Full Documentation: `TOAST_SYSTEM_DOCUMENTATION.md`
- Implementation: `Context/ToastContext.jsx`
- Components: `components/ui/toast/`

