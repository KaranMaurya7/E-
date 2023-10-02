// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB73RxPzWoZAJe9kRHaArcq7iH_Dv6YuO4",
    authDomain: "buybusy114.firebaseapp.com",
    projectId: "buybusy114",
    storageBucket: "buybusy114.appspot.com",
    messagingSenderId: "666855715222",
    appId: "1:666855715222:web:bdfd23fd483a4b64bcedb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export  const db = getFirestore(app);

export { app, auth };