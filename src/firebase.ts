import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIX7q2KgwyJDp9IfoStjP6DoHK5Eqzhrc",
  authDomain: "nucleo-capital.firebaseapp.com",
  databaseURL: "https://nucleo-capital-default-rtdb.firebaseio.com",
  projectId: "nucleo-capital",
  storageBucket: "nucleo-capital.firebasestorage.app",
  messagingSenderId: "828474876054",
  appId: "1:828474876054:web:72b7234e67f3eaebb862b7",
  measurementId: "G-PT20YQ0HH8"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
