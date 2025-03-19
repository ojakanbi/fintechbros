// src/app/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

import dotenv from "dotenv";
dotenv.config();

console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
// Firebase Configuration (Replace with your credentials)
const firebaseConfig = {
  apiKey: "AIzaSyDKpysPaUv8tJEh_ipKpd08MfFpZc9zcWI",  // api key was invalid for some reason (need to debug)
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};


// console.log("🔥 Initializing Firebase... ", firebaseConfig);


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore, Auth & Storage

const auth = getAuth(app);


export {auth, RecaptchaVerifier };
