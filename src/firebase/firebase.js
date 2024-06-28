import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDnySXXN8iwuJ6pxzuPUfkYIvktqgF8uNI",
    authDomain: "dev-rankings-397001.firebaseapp.com",
    projectId: "dev-rankings-397001",
    storageBucket: "dev-rankings-397001.appspot.com",
    messagingSenderId: "772219305853",
    appId: "1:772219305853:web:54d711f4a1748c94605614",
    measurementId: "G-C5WPPLYT6S"
  };

const app = initializeApp(firebaseConfig);

//const storage = firebase.storage();
const db = getFirestore(app);
const auth = getAuth(app);

export {auth};
export {db};
export default app;