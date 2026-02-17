# Debugging Posts Three-Dot Menu on Android

Use this when the post card three-dot menu sometimes opens and sometimes doesn’t on the Capacitor Android app.

## 1. Enable debug logs

- On the **posts page**, add `?debug=postmenu` to the URL.
  - Example: `https://yoursite.com/posts` → `https://yoursite.com/posts?debug=postmenu`
- In the Android app, open the posts screen; if your app supports deep links or you can set the initial URL, use the same query. Otherwise open posts and, if possible, navigate so the URL includes `?debug=postmenu` (e.g. from a dev menu or by building with a default URL that includes it).

## 2. Connect Chrome DevTools (remote debugging)

1. Connect the Android device via USB and enable **USB debugging**.
2. On the PC, open Chrome and go to: `chrome://inspect`
3. Find your WebView (e.g. “WebView in com.yourapp”) and click **inspect**.
4. In the DevTools that open, go to the **Console** tab.
5. In the filter box, type: `PostMenu` so only these logs show.

## 3. Reproduce the issue and watch the logs

Tap the three-dot button on a post several times (when it works and when it doesn’t) and watch the sequence.

**Expected sequence when it works:**

1. `[PostMenu] three-dot button touchEnd` (optional, may appear before click)
2. `[PostMenu] three-dot button click`
3. `[PostMenu] onOptionsClick toggle` with `prev: false`, `next: true`
4. `[PostMenu] dialog open`
5. (No immediate `handleClose` that calls `onClose()`)

**When it fails, look for:**

- **No `three-dot button click`**  
  The tap isn’t firing as a click (e.g. scroll stealing the touch, or touch not turning into a click).  
  → Suggests a **touch/click** or **scroll vs tap** issue on the button.

- **`three-dot button click` but no `onOptionsClick toggle` or no `dialog open`**  
  Click fires but state doesn’t update or dialog doesn’t open.  
  → Suggests a **React state / render** issue (e.g. re-render or unmount around the same time).

- **`dialog open` followed quickly by `handleClose` with `reason: "backdropClick"`**  
  The same tap (or a delayed one) is treated as a backdrop click and closes the menu.  
  → Check `openedAgo` in the log:
  - If `openedAgo < 400` and you see `handleClose IGNORED (native backdrop within window)` → the ignore logic ran; if the menu still closed, something else is calling `onClose`.
  - If `openedAgo >= 400` and you see `handleClose -> onClose()` → the backdrop click happened after the ignore window; consider increasing `NATIVE_BACKDROP_IGNORE_MS` in `OptionsPopup.jsx` or disabling backdrop close on native.

- **`handleClose` with `reason: "backdropClick"` and `openedAgo` very small (e.g. &lt; 50 ms)**  
  The “open” tap is being reported as a backdrop click almost immediately.  
  → Strong indicator of **touch/backdrop timing** on Android; the 400 ms ignore window is there for this.

## 4. What to try next (by what you see)

| What you see | What to try |
|--------------|-------------|
| No `three-dot button click` when menu doesn’t open | Improve tap reliability: e.g. `touch-action: manipulation` (already set), or handle `onTouchEnd` + `preventDefault()` and open menu from touch (careful not to break scroll). |
| Click fires but menu doesn’t open | Check that the same post card is still mounted and that no parent is re-rendering and resetting state. Add a log inside `PostHeader` when `showOptions` changes. |
| `handleClose` with `backdropClick` right after open | Increase `NATIVE_BACKDROP_IGNORE_MS` (e.g. 500–600 ms) in `components/ui/menu/OptionsPopup.jsx`, or on native only ignore backdrop clicks entirely and close only via back button or menu actions. |

## 5. Turn off debug logs

- Remove `?debug=postmenu` from the URL, or
- Search for `postMenuDebug` and `debug=postmenu` in `OptionsPopup.jsx`, `PostHeader.jsx`, and `Posts.jsx` and remove or comment out the debug calls and the URL check when you’re done.
