import React from 'react';
import { useState } from 'react';
import NavbarComponent from './NavbarComponent';
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL} from "firebase/storage";


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

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
const memeRef = ref(storage, 'images/meme.png');
const memeURL = await getDownloadURL(memeRef);

//const studentFile = ref(storage, 'student_data_small.csv');

function App() {
    const [selectedPeriod, selectPeriod] = useState("All");

    const handleSelectPeriod = (periodName) => {
        console.log('Selected item:', periodName);
        selectPeriod(periodName);
    };

  return (
    <div>
      <NavbarComponent onSelect={handleSelectPeriod} />

      <h1>{selectedPeriod}</h1>
      <img src={memeURL} alt="React meme haha" />

      
      {/* Rest of your app content */}
    </div>
  );
}

export default App;