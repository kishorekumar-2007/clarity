import React, { useState, useEffect } from 'react';
// Verify: path correct-ah irukanum
import { auth } from './firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if auth is defined before using it to avoid "n is not a function"
    if (!auth) {
        console.error("Firebase auth not initialized!");
        return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    }, (error) => {
      console.error("Auth Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loader-container" style={{ 
          display: 'flex', 
          height: '100vh', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          background: '#0f172a', // Dark theme matching your founder card
          color: 'white' 
      }}>
          <div className="spinner"></div> {/* Idhuku CSS namma Dashboard.css-la add pannalam */}
          <h2 style={{ marginTop: '20px', letterSpacing: '2px' }}>KISHORE AI IS INITIALIZING...</h2>
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