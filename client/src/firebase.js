// client/src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCjch7560KZEIhUxza8HGj9ioWXvjXcB78",
  authDomain: "chord-game-20bd3.firebaseapp.com",
  projectId: "chord-game-20bd3",
  storageBucket: "chord-game-20bd3.firebasestorage.app",
  messagingSenderId: "149536659231",
  appId: "1:149536659231:web:d4c3be4f80a8582bc1c22a",
  measurementId: "G-XH9H9PG4WP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
