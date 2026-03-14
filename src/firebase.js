import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration [cite: 2026-03-06]
const firebaseConfig = {
  apiKey: "AIzaSyDgG5WeJ8Jd2Yllv94HWzLCxpIgiIaIfx4",
  authDomain: "kishore-study-tracker.firebaseapp.com",
  projectId: "kishore-study-tracker",
  storageBucket: "kishore-study-tracker.firebasestorage.app",
  messagingSenderId: "225418512609",
  appId: "1:225418512609:web:d23af9f8bdbe3fa1078fa0",
  measurementId: "G-TBVMNSQ9Q7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exporting services for use in App.jsx and Components [cite: 2026-03-06, 2026-03-07]
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;