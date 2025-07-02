// Login.js
import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase';

const Login = () => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const res = await fetch('https://86a7glme66.execute-api.us-east-2.amazonaws.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      });

      const data = await res.json();
    } catch (err) {
      alert('Login failed.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>🎵 Welcome to Chordly</h2>
      <button onClick={handleLogin} style={{
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4285F4',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;