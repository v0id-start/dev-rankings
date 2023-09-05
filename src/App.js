import { React, useState } from 'react';

import RankingBoard from './components/RankingBoard';
import {auth} from './firebase.js';
import 'firebaseui/dist/firebaseui.css';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';



function App() {
  const [authEmail, setAuthEmail] = useState("");

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
