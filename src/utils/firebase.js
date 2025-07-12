import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA8GUZNH1o326lKCo_-m3gI3aDi7EwEQQ",
  authDomain: "pet-registration-app.firebaseapp.com",
  projectId: "pet-registration-app",
  storageBucket: "pet-registration-app.firebasestorage.app",
  messagingSenderId: "916479177600",
  appId: "1:916479177600:web:cccdd707e16834be360765"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };