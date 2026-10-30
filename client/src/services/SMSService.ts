

import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  UserCredential,
} from "firebase/auth";

// Firebase config (replace with your own config)
// const firebaseConfig = {
//   apiKey:
//     import.meta.env.VITE_FIREBASE_API_KEY ||
//     "AIzaSyDadhQvQJsezb0Jj8LkaA6NPHvZ6b3guuY",
//   authDomain:
//     import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
//     "fir-demo-project.firebaseapp.com",
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fir-demo-project",
//   storageBucket:
//     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
//     "fir-demo-project.firebasestorage.app",
//   messagingSenderId:
//     import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "103954809500",
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyDm2UVpzbi5Xf6B1xhvwMEwwvIghkbGq5I",
  authDomain: "testing-63257.firebaseapp.com",
  projectId: "testing-63257",
  storageBucket: "testing-63257.firebasestorage.app",
  messagingSenderId: "741828639028",
  appId: "1:741828639028:web:f5b3467d1884b752d1cd61",
};

// Initialize Firebase only once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

export interface FirebaseOTPResponse {
  success: boolean;
  message: string;
  confirmationResult?: ConfirmationResult;
  error?: string;
}

export class FirebasePhoneService {
  // Setup reCAPTCHA
  static setupRecaptcha(containerId: string = "recaptcha-container") {
    if (!window.recaptchaVerifier) {
      console.debug(
        "[FirebasePhoneService] Creating new RecaptchaVerifier for container:",
        containerId
      );
      window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: "invisible",
        callback: (response: any) => {
          console.debug("[FirebasePhoneService] reCAPTCHA solved:", response);
        },
      });
    } else {
      console.debug(
        "[FirebasePhoneService] Using existing RecaptchaVerifier instance."
      );
    }
    return window.recaptchaVerifier;
  }

  // Send OTP using Firebase
  static async sendOTP(
    phoneNumber: string,
    recaptchaContainerId: string = "recaptcha-container"
  ): Promise<FirebaseOTPResponse> {
    try {
      console.debug(
        "[FirebasePhoneService] Attempting to send OTP to:",
        phoneNumber
      );
      const verifier = this.setupRecaptcha(recaptchaContainerId);
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        verifier
      );
      console.debug(
        "[FirebasePhoneService] OTP sent successfully. ConfirmationResult:",
        confirmationResult
      );
      return {
        success: true,
        message: "OTP sent successfully",
        confirmationResult,
      };
    } catch (error: any) {
      console.error("[FirebasePhoneService] Failed to send OTP:", error);
      return {
        success: false,
        message: "Failed to send OTP",
        error: error.message,
      };
    }
  }

  // Verify OTP using Firebase
  static async verifyOTP(
    confirmationResult: ConfirmationResult,
    otp: string
  ): Promise<{
    success: boolean;
    message: string;
    userCredential?: UserCredential;
    error?: string;
  }> {
    try {
      console.debug("[FirebasePhoneService] Attempting to verify OTP:", otp);
      const userCredential = await confirmationResult.confirm(otp);
      console.debug(
        "[FirebasePhoneService] OTP verified successfully. UserCredential:",
        userCredential
      );
      return {
        success: true,
        message: "OTP verified successfully!",
        userCredential,
      };
    } catch (error: any) {
      console.error("[FirebasePhoneService] Failed to verify OTP:", error);
      return {
        success: false,
        message: "Invalid OTP or verification failed.",
        error: error.message,
      };
    }
  }
}

// Note: You must have a <div id="recaptcha-container"></div> in your HTML for reCAPTCHA to work.
