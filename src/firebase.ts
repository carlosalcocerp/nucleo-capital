import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDIX7q2KgwyJDp9IfoStjP6DoHK5Eqzhrc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nucleo-capital.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://nucleo-capital-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nucleo-capital",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nucleo-capital.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "828474876054",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:828474876054:web:72b7234e67f3eaebb862b7",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-PT20YQ0HH8",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
