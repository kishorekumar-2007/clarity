import React, { useState, useEffect } from 'react';
// Verify: Unga file name 'firebase.js' nu dhaan irukkanum (ellamae small letters)
import { auth } from './firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Refresh pannum podhu login state-ai thirumba kootitu varum [cite: 2026-03-07]
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#fdf3e7' }}>
         <h2 style={{ color: '#ff9933' }}>Loading Academy... ⚡</h2>
      </div>
    );
  }

  return (
    <div className="App">
      {user ? <Dashboard /> : <Login />}
    </div>
  );
}

export default App;