// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBcNoMW4MpnGaz_W8PyoKVtWQRwCi9lSAo",
  authDomain: "visitor-app-a45ed.firebaseapp.com",
  projectId: "visitor-app-a45ed",
  storageBucket: "visitor-app-a45ed.appspot.com",
  messagingSenderId: "546997772203",
  appId: "1:546997772203:web:132341d4ad5e26f729bcee",
  measurementId: "G-Z6KNZ7E67K"
};


const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)