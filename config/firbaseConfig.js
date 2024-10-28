// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "hosinder-8f279.firebaseapp.com",
  projectId: "hosinder-8f279",
  storageBucket: "hosinder-8f279.appspot.com",
  messagingSenderId: "593386915137",
  appId: "1:593386915137:web:8b52ef45f4dadee6d08dc0",
  measurementId: "G-G5EGJRCJCD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


