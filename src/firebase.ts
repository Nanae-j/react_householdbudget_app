// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'household-typescript-8acbe.firebaseapp.com',
  projectId: 'household-typescript-8acbe',
  storageBucket: 'household-typescript-8acbe.firebasestorage.app',
  messagingSenderId: '77468511132',
  appId: '1:77468511132:web:ef0a30b56aaab47db13659',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
