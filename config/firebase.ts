// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKiW1VyWZjZE9WgVX92VkZ_WiLrMz-xkw",
  authDomain: "fintra-ef0f5.firebaseapp.com",
  projectId: "fintra-ef0f5",
  storageBucket: "fintra-ef0f5.firebasestorage.app",
  messagingSenderId: "865839972667",
  appId: "1:865839972667:web:545fb3a49512cfa369771e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const firestore = getFirestore(app);

export { auth, firestore };