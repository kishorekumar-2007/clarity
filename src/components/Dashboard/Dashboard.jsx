import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "../../firebase"; 
import { doc, getDoc } from "firebase/firestore";

// Components
import Home from "./Home";        
import ExamPrep from "./ExamPrep"; 
import YourGoals from "./YourGoals"; // Double-check this file exists in the same folder
import Settings from "./Settings"; 
import UserManagement from "./UserManagement"; 
import AIChatBot from "./AIChatBot"; 
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState('student'); 
  const [loading, setLoading] = useState(true);

  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Tamil', status: 'Pending' },
    { id: 2, name: 'English', status: 'Pending' },
    { id: 3, name: 'Mathematics', status: 'Pending' },
    { id: 4, name: 'Physics', status: 'Pending' },
    { id: 5, name: 'Chemistry', status: 'Pending' },
    { id: 6, name: 'Biology / CS', status: 'Pending' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserRole(docSnap.data().role || 'student');
          }
        } catch (error) {
          console.error("Error fetching role:", error);
        }
      }
      setLoading(false);
    };

    fetchUserRole();
    return () => clearInterval(timer);
  }, []);

  const toggleStatus = (id) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, status: s.status === 'Completed' ? 'Pending' : 'Completed' } : s));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  const renderContent = () => {
    if (loading) return <div className="loader">Initializing ...</div>;

    switch(activeTab) {
      case 'Dashboard':
        return (
          <motion.div 
            key="dash" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="content-grid"
          >
            <div className="glass-panel">
              <h3 className="panel-title">Subjects</h3>
              {subjects.map(sub => (
                <div key={sub.id} className="tracker-row" onClick={() => toggleStatus(sub.id)}>
                  <span>{sub.name}</span>
                  <div className="flex-status">
                    <div className={`status-dot ${sub.status === 'Completed' ? 'done' : 'wait'}`}></div>
                    <span className={sub.status === 'Completed' ? 'text-done' : 'text-wait'}>{sub.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="widgets-stack">
              <div className="glass-panel ai-mini-widget" onClick={() => setActiveTab('AI Assistant')}>
                 <h4>AI Doubts Buster 🤖</h4>
                 <p>Ask anything about your subjects...</p>
                 <button className="mini-ai-btn">Chat Now</button>
              </div>

              <div className="glass-panel text-center">
                <p className="label">PREPARATION PROGRESS</p>
                <div className="sphere-3d-wrapper">
                  <motion.div className="water-layer" animate={{ height: '50%' }} />
                  <div className="percentage-text">50%</div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      
      case 'AI Assistant': return <AIChatBot key="ai" />;
      case 'Your Goals': return <YourGoals key="goals" />; 
      case 'Career Guidance': return <Home key="career" />; 
      case 'Competitive Exams': return <ExamPrep key="exam" />; 
      case 'User Management': return <UserManagement key="users" />; 
      case 'Settings': return <Settings key="settings" />; 
      default: return <div className="glass-panel"><h3>Selection Error</h3></div>;
    }
  };

  // Nav Items Logic
  const navItems = ['Dashboard', 'AI Assistant', 'Your Goals', 'Career Guidance', 'Competitive Exams', 'Settings'];
  const finalNav = userRole === 'admin' ? [...navItems, 'User Management'] : navItems;

  return (
    <div className="dashboard-root">
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
      </div>

      <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
        <h2 className="logo">⚡ KISHORE AI ⚡</h2>
        <nav className="nav-list">
          {finalNav.map(tab => (
            <button 
              key={tab}
              className={`nav-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}

      <main className="main-view">
        <header className="premium-banner">
          <div>
            <h1>Good Day, {userRole === 'admin' ? ' Kishore' : 'Warrior'}! 🏹</h1>
            <p>{new Date().toDateString()}</p>
          </div>
          <div className="time-display">{time}</div>
        </header>

        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;