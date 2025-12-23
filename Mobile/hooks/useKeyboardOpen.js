import { Keyboard } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';
import { useEffect, useState } from 'react';

export function useKeyboardOpen() {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    // ✅ Native platforms (Android / iOS)
    if (Capacitor.isNativePlatform()) {
      const show = Keyboard.addListener('keyboardWillShow', () => {
        setKeyboardOpen(true);
      });

      const hide = Keyboard.addListener('keyboardWillHide', () => {
        setKeyboardOpen(false);
      });

      return () => {
        show.remove();
        hide.remove();
      };
    }

    // ✅ Web fallback (important for browser testing)
    const onFocusIn = () => setKeyboardOpen(true);
    const onFocusOut = () => setKeyboardOpen(false);

    window.addEventListener('focusin', onFocusIn);
    window.addEventListener('focusout', onFocusOut);

    return () => {
      window.removeEventListener('focusin', onFocusIn);
      window.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  return keyboardOpen;
}
