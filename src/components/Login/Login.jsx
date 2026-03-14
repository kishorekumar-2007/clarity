import React, { useState } from 'react';
import './Login.css';
import bgImage from '../../assets/login-bg.webp'; 
import { auth, db } from '../../firebase'; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { Eye, EyeOff, Loader2 } from 'lucide-react';

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    if (!email || !password || (isSignup && !username)) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);
    try {
      if (isSignup) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        
        // Unga email-ah inga replacement pannikonga admin role-ku
        const userRole = (email === "your-email@gmail.com") ? "admin" : "student";

        await setDoc(doc(db, "users", res.user.uid), {
          username: username,
          email: email,
          role: userRole,
          isApproved: true, 
          createdAt: new Date().toISOString()
        });

        alert(`Welcome ${username}! Account created successfully.`);
        onLogin(); 

      } else {
        let loginEmail = email;
        if (!email.includes('@')) {
          const q = query(collection(db, "users"), where("username", "==", email));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            loginEmail = querySnapshot.docs[0].data().email;
          } else {
            throw new Error("Username not found!");
          }
        }

        const res = await signInWithEmailAndPassword(auth, loginEmail, password);
        const userSnap = await getDoc(doc(db, "users", res.user.uid));
        
        if (userSnap.exists()) {
          if (userSnap.data().isApproved === true) {
            onLogin();
          } else {
            alert("Access Denied! Contact Kishore.");
            auth.signOut();
          }
        }
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="glass-wrapper">
        {/* LEFT SECTION */}
        <div className="login-section">
          <h1 style={{color: 'white', fontFamily: 'Syncopate', fontSize: '24px'}}>
            {isSignup ? 'CREATE ACCOUNT' : 'WELCOME BACK'}
          </h1>
          <p className="login-subtitle">
            {isSignup ? 'Join the AI Growth Community' : 'Login to your AI portal'}
          </p>

          {isSignup && (
            <div className="input-box">
              <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            </div>
          )}

          <div className="input-box">
            <input 
              type="text" 
              placeholder={isSignup ? "Email Address" : "Email or Username"} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          
          <div className="input-box password-field">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <div className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} color="#ccc" /> : <Eye size={20} color="#ccc" />}
            </div>
          </div>

          <button className="sign-in-btn" onClick={handleAction} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="spinner-icon" /> 
            ) : (
              isSignup ? 'Sign Up Now' : 'Sign In'
            )}
          </button>

          <p className="toggle-text" onClick={() => { setIsSignup(!isSignup); setIsLoading(false); }}>
            {isSignup ? 'Already have access? Login' : 'New student? Register here'}
          </p>
        </div>

        {/* RIGHT SECTION - BLACK CARD */}
        <div className="info-section">
          <div className="info-content">
            <h2>Track smarter.<br/>Stay organized.<br/>Start here. 📊</h2>
            <p>"Discipline turns goals into reality!"</p>
          </div>

          <div className="founder-details">
            <h4>Mr Kishore Kumar</h4>
            <p>Founder</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;