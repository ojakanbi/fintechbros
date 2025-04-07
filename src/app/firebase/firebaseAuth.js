// src/app/firebase/phoneAuth.js
import { auth, RecaptchaVerifier } from './firebaseConfig';
import { signInWithPhoneNumber } from 'firebase/auth';

let confirmationResultGlobal = null;

// Setup reCAPTCHA
export const setupRecaptcha = () => {
  if (typeof window === 'undefined') return;

  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log("✅ reCAPTCHA solved:", response);
      },
      'expired-callback': () => {
        console.warn("⚠️ reCAPTCHA expired");
      }
    });
  }
};

// Send OTP
export const sendOTP = async (phoneNumber) => {
  if (!window.recaptchaVerifier) {
    throw new Error("❌ reCAPTCHA not initialized");
  }

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
    confirmationResultGlobal = confirmationResult;
    console.log("📲 OTP sent!");
    return true;
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    throw error;
  }
};

// Verify OTP
export const verifyOTP = async (otp) => {
  if (!confirmationResultGlobal) {
    throw new Error("❌ No OTP request in progress");
  }

  try {
    const result = await confirmationResultGlobal.confirm(otp);
    const user = result.user;
    console.log("✅ Phone number verified!", user);
    return user;
  } catch (error) {
    console.error("❌ Invalid OTP:", error);
    throw error;
  }
};
