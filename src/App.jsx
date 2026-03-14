import React, { useState, useEffect } from 'react';
import { auth } from './firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Unga list-la irukira 10 members emails-ah inga add pannikonga [cite: 2026-03-06]
  const allowedUsers = [
    'kishore@gmail.com', 
    'friend1@gmail.com',
    'friend2@gmail.com'
    // ... total 10 per
  ];

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Security: Allowed list-la irundha mattum dhaan dashboard kaatum
      if (currentUser && allowedUsers.includes(currentUser.email)) {
        setUser(currentUser);
      } else if (currentUser) {
        // Unrecognized user-ah logout panna:
        auth.signOut();
        alert("Neenga authorized user illai bro!");
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#0f172a', color: 'white' }}>
          <h2>KISHORE AI IS INITIALIZING... 🚀</h2>
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