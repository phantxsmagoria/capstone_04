
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };