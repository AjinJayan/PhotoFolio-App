// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAeesEOX7h0q1t-ltvUsdNNKWilr3mNbaE",
    authDomain: "photofolio-f6643.firebaseapp.com",
    projectId: "photofolio-f6643",
    storageBucket: "photofolio-f6643.appspot.com",
    messagingSenderId: "264449924215",
    appId: "1:264449924215:web:5f344742375639f6747a72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)