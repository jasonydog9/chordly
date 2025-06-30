import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.js';
import Game from '../Game.js'
import Layout from '../components/layout.jsx';
import About from './About.js';
import Help from './Help.js';
import { Button } from "../components/ui/button.tsx"
import { useState } from 'react';

function Home({ user }) {

   const [settings, setSettings] = useState(null);
  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.error('Logout error:', error);
    });
  };

  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Layout user = {user} setSettings={setSettings}/>}>
          <Route index element={<Game firebaseUser={user} settings={settings}/>} />
          <Route path="about" element={<About />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </Router>
    </div>
  );
}

export default Home;