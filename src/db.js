// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyB_J3tpEk-HaVB5vy57bfIKlL9QeScYVNU",
  authDomain: "tellbookstore.firebaseapp.com",
  databaseURL: "https://tellbookstore.firebaseio.com",
  projectId: "tellbookstore",
  storageBucket: "tellbookstore.appspot.com",
  messagingSenderId: "811081774579",
  appId: "1:811081774579:web:f6b9d56c73693c7b2b0e86",
  measurementId: "G-0LD60PJ532"
};


const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)