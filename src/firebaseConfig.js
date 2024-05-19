// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5ayOvIqIbUuIoE7rxJ3-lwhGF0OLKYGo",
  authDomain: "qlhs-42b69.firebaseapp.com",
  projectId: "qlhs-42b69",
  storageBucket: "qlhs-42b69.appspot.com",
  messagingSenderId: "890245936281",
  appId: "1:890245936281:web:b3ebdc761578bc8916f408",
  measurementId: "G-1106GHTPS1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };