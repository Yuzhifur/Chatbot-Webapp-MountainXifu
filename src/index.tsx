// Import the functions you need from the SDKs you need
import React from 'react';
import ReactDOM from 'react-dom/client'; // Fix: unsure comfy ts lint problem
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import App from './App'; // Fix: there is app and App
import './index.css';

const firebaseConfig = { // Fix: doesn't need a type here, comfy ts lint problem
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "mountainxifu.firebaseapp.com",
  projectId: "mountainxifu",
  storageBucket: "mountainxifu.firebasestorage.app",
  messagingSenderId: "395356199754",
  appId: "1:395356199754:web:dbbf016120a06df30fbfb3",
  measurementId: "G-TW4385V9YB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Fix: that is a comfy ts lint problem I don't think it needs a type here
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const functions = getFunctions(app);

if (window.location.hostname === 'localhost') {
  console.log('Using Firebase emulators');
  connectFirestoreEmulator(db, 'localhost', 8081);
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectStorageEmulator(storage, 'localhost', 9199);
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);