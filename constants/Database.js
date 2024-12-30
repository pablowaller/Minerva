// Importar los módulos necesarios de Firebase de la nueva versión modular
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDQJ-amic1aPwLp1B-XyctBgcMRd6ogYwM",
  authDomain: "sense-bell.firebaseapp.com",
  databaseURL: "https://sense-bell-default-rtdb.firebaseio.com",
  projectId: "sense-bell",
  storageBucket: "sense-bell.firebasestorage.app",
  messagingSenderId: "874279177046",
  appId: "1:874279177046:web:4e4d73cf115cb8702224f7",
  measurementId: "G-D0VE0JN5KQ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener las instancias de Firestore, Auth y Analytics
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, auth, analytics };
