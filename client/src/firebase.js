// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "socialpedia-85f7c.firebaseapp.com",
  projectId: "socialpedia-85f7c",
  storageBucket: "socialpedia-85f7c.appspot.com",
  messagingSenderId: "1056292941428",
  appId: "1:1056292941428:web:46cec01495a8c99532eb21",
  measurementId: "G-2LPYFJSYQ0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);