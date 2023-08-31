import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDnySXXN8iwuJ6pxzuPUfkYIvktqgF8uNI",
    authDomain: "dev-rankings-397001.firebaseapp.com",
    projectId: "dev-rankings-397001",
    storageBucket: "dev-rankings-397001.appspot.com",
    messagingSenderId: "772219305853",
    appId: "1:772219305853:web:54d711f4a1748c94605614",
    measurementId: "G-C5WPPLYT6S"
  };

const app = firebase.initializeApp(firebaseConfig);

//const storage = firebase.storage();
const db = firebase.firestore();
export {db};
export default app;