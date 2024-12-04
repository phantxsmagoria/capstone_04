// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGAfl2ThtWoTNq1vZeu66DOAvBWIqNGOI",
  authDomain: "lenteaapp.firebaseapp.com",
  projectId: "lenteaapp",
  storageBucket: "lenteaapp.appspot.com",
  messagingSenderId: "1014876057789",
  appId: "1:1014876057789:web:eb8ab0299012a157ae47d4",
  measurementId: "G-8WSL0NM9KE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth and set persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Adding logs to verify initialization
console.log("Firebase initialized:", auth.currentUser);
console.log("Firestore instance:", db);

export { db, auth };
