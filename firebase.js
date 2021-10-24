import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCXyhhypAaP_BHLwgCkLRHD5rM68p0CJXI",
    authDomain: "minerva-72196.firebaseapp.com",
    projectId: "minerva-72196",
    storageBucket: "minerva-72196.appspot.com",
    messagingSenderId: "836136788262",
    appId: "1:836136788262:web:da7faaa75a0ab25dd8e1e7"
};

let app;

if (firebase.apps.length == 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth();
export { db, auth };