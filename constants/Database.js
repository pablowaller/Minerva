import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD33v7nCUTB9_J0UANMHIHUzQFbpNwaojk",
  authDomain: "minerva-71d8d.firebaseapp.com",
  projectId: "minerva-71d8d",
  storageBucket: "minerva-71d8d.appspot.com",
  messagingSenderId: "566501806925",
  appId: "1:566501806925:web:f8534a6f6f8afc46271d04"
};

let app;

if (firebase?.apps.length==0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth();
export { db, auth };