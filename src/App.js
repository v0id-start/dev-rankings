import { React, useEffect, useState } from 'react';

import RankingBoard from './components/RankingBoard';
import firebase from 'firebase/compat/app';
import {auth} from './firebase.js';
import 'firebaseui/dist/firebaseui.css';
import * as firebaseui from 'firebaseui'
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';



function App() {
  const [authEmail, setAuthEmail] = useState("");
  /*
  useEffect(() => {
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        // List of OAuth providers supported.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      // Other config options...
    });

  }, []);
  */

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
      <RankingBoard userEmail={authEmail}/>

      <div id="firebaseui-auth-container"></div>
      <button onClick={signInWithGoogle}>
          Login with Google
        </button>

        <button onClick={logout}>
          Sign Out
        </button>
    </div>
  );
}

export default App;
