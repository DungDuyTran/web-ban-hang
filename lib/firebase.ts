// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFeNM_hVLlR3o-d2OD53nFM7M3mk53P8E",
  authDomain: "websitethoitrangonline.firebaseapp.com",
  projectId: "websitethoitrangonline",
  storageBucket: "websitethoitrangonline.firebasestorage.app",
  messagingSenderId: "157256364421",
  appId: "1:157256364421:web:6839d7cf7863a7f5e6d4ec",
  measurementId: "G-YYVDB3SYF4",
};

const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export const auth = getAuth(app);

export { app, analytics };
export const googleProvider = new GoogleAuthProvider();
