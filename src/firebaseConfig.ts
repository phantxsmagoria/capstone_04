// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, reactNativeLocalPersistence } from 'firebase/auth/react-native';
import { getAnalytics, isSupported } from 'firebase/analytics';
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

// Setup Analytics with isSupported check
(async () => {
  const supported = await isSupported();
  if (supported) {
    getAnalytics(app);
  } else {
    console.warn('Firebase Analytics no es compatible en este entorno.');
  }
})();

const db = getFirestore(app);

// Initialize Auth and set persistence
const auth = initializeAuth(app, {
  persistence: reactNativeLocalPersistence
});

export { db, auth };
