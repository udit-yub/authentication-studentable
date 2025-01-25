// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8Kyy0mPpYsx2ZXf7WqPNR9vuA6KcUPJI",
  authDomain: "student-details-62348.firebaseapp.com",
  projectId: "student-details-62348",
  storageBucket: "student-details-62348.firebasestorage.app",
  messagingSenderId: "960746100200",
  appId: "1:960746100200:web:17c00cc16442b824ea005d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth()
export const db = getFirestore(app)
export default app