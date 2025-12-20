import { Capacitor } from "@capacitor/core";

export const isNativeApp = Capacitor.isNativePlatform();
export const isMobileWeb = !isNativeApp && /android|iphone|ipad|ipod/i.test(navigator.userAgent);
export const isDesktopWeb = !isNativeApp && !isMobileWeb;

