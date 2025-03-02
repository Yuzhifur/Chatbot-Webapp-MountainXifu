// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
require('dotenv').config();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mountainxifu.firebaseapp.com",
  projectId: "mountainxifu",
  storageBucket: "mountainxifu.firebasestorage.app",
  messagingSenderId: "395356199754",
  appId: "1:395356199754:web:dbbf016120a06df30fbfb3",
  measurementId: "G-TW4385V9YB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);