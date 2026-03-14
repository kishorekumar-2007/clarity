import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Correction: "../../" koodathu, "../" mattum podungha
import { auth } from '../../firebase'; 
import { signOut } from 'firebase/auth';

const Settings = () => {
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      window.location.href = '/'; 
    }).catch(err => console.log(err));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel">
      <h3>System Settings ⚙️</h3>
      <div className="settings-item">
        <button onClick={() => setIsDark(!isDark)} className="nav-item active">
          {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
      <div className="settings-item" style={{ marginTop: '20px' }}>
        <button onClick={handleLogout} className="nav-item logout-btn">Logout 🚪</button>
      </div>
    </motion.div>
  );
};

export default Settings;