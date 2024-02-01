import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA7EVcGYc1iZ63IAP3IOEtpdjCM166WESk",
  authDomain: "larissaacipreste-71179.firebaseapp.com",
  projectId: "larissaacipreste-71179",
  storageBucket: "larissaacipreste-71179.appspot.com",
  messagingSenderId: "641582903120",
  appId: "1:641582903120:web:b18120a6e9c0a374eb8655",
  measurementId: "G-HNB68XQPDD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const storage = getStorage();

export { app, db, storage };
