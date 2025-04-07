import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyD33v7nCUTB9_J0UANMHIHUzQFbpNwaojk",
  authDomain: "minerva-71d8d.firebaseapp.com",
  databaseURL: "https://minerva-71d8d-default-rtdb.firebaseio.com",
  projectId: "minerva-71d8d",
  storageBucket: "minerva-71d8d.firebasestorage.app",
  messagingSenderId: "566501806925",
  appId: "1:566501806925:web:f8534a6f6f8afc46271d04",
  measurementId: "G-DYRH83NYNT"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, auth, analytics };
