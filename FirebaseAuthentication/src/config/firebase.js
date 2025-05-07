// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnVTyUGi8FngiQ9vuuSxS_TuOztDf2l7s",
  authDomain: "firstproject-51166.firebaseapp.com",
  projectId: "firstproject-51166",
  storageBucket: "firstproject-51166.firebasestorage.app",
  messagingSenderId: "70057637536",
  appId: "1:70057637536:web:8c0e1836dc6857b34efbc5",
  measurementId: "G-3NBZDM8XVZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const analytics = getAnalytics(app);
const authProvider = new GoogleAuthProvider()

export {auth, authProvider}