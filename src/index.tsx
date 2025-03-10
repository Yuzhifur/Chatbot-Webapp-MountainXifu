// Import the functions you need from the SDKs you need
import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import App from './App';
import './index.css';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
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
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);