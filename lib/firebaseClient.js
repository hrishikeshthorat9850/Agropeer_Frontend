// lib/firebaseClient.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
// ✅ For OTP Authentication
export const auth = getAuth(app);
export { RecaptchaVerifier, signInWithPhoneNumber };

export const getMessagingIfSupported = async () => {
  if (typeof window === 'undefined') return null;
  try {
    return (await isSupported()) ? getMessaging(app) : null;
  } catch {
    return null;
  }
};
