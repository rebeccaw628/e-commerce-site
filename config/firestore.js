// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRESTORE_API,
  authDomain: "e-commerce-site-d22dc.firebaseapp.com",
  projectId: "e-commerce-site-d22dc",
  storageBucket: "e-commerce-site-d22dc.firebasestorage.app",
  messagingSenderId: "304804162324",
  appId: "1:304804162324:web:7ae076b942c12aba42b001",
  measurementId: "G-F9F93MJC5V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
