import React, { useState, useEffect } from 'react';
import { auth } from './firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      console.error("Firebase Auth initialization failed.");
      return;
    }

    // [cite: 2026-03-07] - No error crash logic
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Security list-ah remove panniten. Ippo yaaru register pannaalum ulla allow pannum.
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
      <div style={{ 
          display: 'flex', 
          height: '100vh', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          background: '#0f172a', 
          color: 'white' 
      }}>
          {/* Loading Animation [cite: 2026-03-06] */}
          <div className="spinner"></div> 
          <h2 style={{ marginTop: '20px', letterSpacing: '2px' }}>CLARITY IS INITIALIZING... 🚀</h2>
      </div>
    );
  }

  return (
    <div className="App">
      {/* If logged in, go to Dashboard. Otherwise, show Login/Register */}
      {user ? <Dashboard /> : <Login />}
    </div>
  );
}

export default App;