import { React, useState } from 'react';

import RankingBoard from './components/RankingBoard';
import {auth} from './firebase/firebase.js';
import 'firebaseui/dist/firebaseui.css';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';



function App() {
  const [authEmail, setAuthEmail] = useState("");
  const [bugSquashed, setBugSquashed] = useState(false); // Image is visible by default

  const squashBug = () => {
    setBugSquashed(true); // Hide the image when button is clicked
  };

  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
  
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      console.log(user.email);
      setAuthEmail(user.email);
      return user;
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  function logout() {
    setAuthEmail("");
  }

  return (
    <div className="App">
      <RankingBoard userEmail={authEmail} bugSquashed={bugSquashed}/>

      <div id="firebaseui-auth-container"></div>
      <button onClick={signInWithGoogle}>
          Login with Google
        </button>

        <button onClick={logout}>
          Sign Out
        </button>

        {!bugSquashed && (
          <img src="bug.png" alt="bug" onClick={squashBug} style={{ width: '30px', height: '30px', cursor: 'pointer'}}/>
        )}

    </div>
  );
}

export default App;
