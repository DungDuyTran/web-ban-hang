// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFeNM_hVLlR3o-d2OD53nFM7M3mk53P8E",
  authDomain: "websitethoitrangonline.firebaseapp.com",
  projectId: "websitethoitrangonline",
  storageBucket: "websitethoitrangonline.firebasestorage.app",
  messagingSenderId: "157256364421",
  appId: "1:157256364421:web:6839d7cf7863a7f5e6d4ec",
  measurementId: "G-YYVDB3SYF4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// ✅ Khởi tạo auth
export const auth = getAuth(app);

// Nếu sau này bạn cần app hoặc analytics thì cũng export ra
export { app, analytics };
export const googleProvider = new GoogleAuthProvider();
