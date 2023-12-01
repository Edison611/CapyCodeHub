// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDY23Hle1Ezz0ELKL1nE7HS19bRHcSL8dw",
  authDomain: "vex-via.firebaseapp.com",
  projectId: "vex-via",
  storageBucket: "vex-via.appspot.com",
  messagingSenderId: "251384380878",
  appId: "1:251384380878:web:73cd02d9e7b3c7b8c23f9f",
  measurementId: "G-F0XDK0YDHR"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

export { firestore };