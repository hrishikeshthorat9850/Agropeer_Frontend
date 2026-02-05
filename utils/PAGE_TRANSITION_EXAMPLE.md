# Forward Page Transition - Integration Example

## Example: Enhancing MobileBottomNav Component

This example shows how to optionally enhance an existing component with smooth transitions while preserving all existing behavior.

### Original Component (Unchanged - Still Works!)

```jsx
// components/mobile/MobileBottomNav.jsx
import { useRouter } from "next/navigation";

export default function MobileBottomNav() {
  const router = useRouter();
  
  return (
    <button onClick={() => router.push("/")}>
      Home
    </button>
  );
}
```

### Enhanced Version (Optional - Additive Only)

```jsx
// components/mobile/MobileBottomNav.jsx
import { useRouter } from "next/navigation";
// ADDITIVE: Import transition hook (optional enhancement)
import { usePageTransition } from "@/hooks/usePageTransition";

export default function MobileBottomNav() {
  const router = useRouter();
  // ADDITIVE: Get transition-enhanced navigation functions
  const { push } = usePageTransition();
  
  return (
    <button onClick={() => push("/")}>
      {/* 
        ENHANCEMENT: Changed router.push("/") to push("/")
        PRESERVED: All other behavior unchanged
        RESULT: Same navigation, with smooth transition
      */}
      Home
    </button>
  );
}
```

### What Changed

**Before**:
- `router.push("/")` - Direct navigation, no transition

**After**:
- `push("/")` - Same navigation, with smooth transition

**Preserved**:
- ✅ Router instance still available
- ✅ All other navigation calls unchanged
- ✅ Component structure unchanged
- ✅ All props and state unchanged

### Gradual Adoption

You can enhance components one at a time:

```jsx
// Mix of enhanced and original navigation
export default function MyComponent() {
  const router = useRouter();
  const { push } = usePageTransition();
  
  return (
    <>
      {/* Enhanced with transition */}
      <button onClick={() => push("/profile")}>
        Profile (with transition)
      </button>
      
      {/* Original - still works without transition */}
      <button onClick={() => router.push("/settings")}>
        Settings (no transition)
      </button>
    </>
  );
}
```

### Link Component Example

**Original**:
```jsx
import Link from "next/link";

<Link href="/profile">Profile</Link>
```

**Enhanced** (optional):
```jsx
import TransitionLink from "@/components/TransitionLink";

<TransitionLink href="/profile">Profile</TransitionLink>
```

**Both work**: You can use either, or mix them!

### Key Points

1. **No Breaking Changes**: Original code continues to work
2. **Optional Enhancement**: Adopt gradually, per-component
3. **Preserves Behavior**: All navigation logic unchanged
4. **Easy Migration**: Simple find/replace when ready
