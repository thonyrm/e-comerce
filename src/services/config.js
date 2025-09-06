
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: "AIzaSyCmf-QV7T0imGtGLgZm1pyQ9aFFt2oqi3Q",
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "coder-ecomerce-92a56.firebaseapp.com",
    projectId: "coder-ecomerce-92a56",
    storageBucket: "coder-ecomerce-92a56.firebasestorage.app",
    messagingSenderId: "755683780800",
    appId: "1:755683780800:web:026632cb48bc1c9714a525"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

