import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfo79hA09i4nEzUVWsWcCYrqXCu80X8lY",
  authDomain: "fimo-dc366.firebaseapp.com",
  projectId: "fimo-dc366",
  storageBucket: "fimo-dc366.firebasestorage.app",
  messagingSenderId: "540845117562",
  appId: "1:540845117562:web:86d5fce3636a5699052bc3",
  measurementId: "G-LEXSQPNTWE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();