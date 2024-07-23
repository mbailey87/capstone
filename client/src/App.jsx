// client/src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import AdminLoginPage from './pages/AdminLoginPage';
import StudentLoginPage from './pages/studentLogin';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AdminLoginPage" element={<AdminLoginPage />} />
          <Route path="/studentLogin" element={<StudentLoginPage />} />
          <Route path="/RegistrationPage" element={<RegistrationPage />} />
          <Route path="/home/student" element={<ProtectedRoute element={StudentDashboardPage} />} /> {/* Protect StudentDashboardPage route */}
          <Route path="/home/admin" element={<ProtectedRoute element={AdminDashboardPage} />} /> {/* Protect AdminDashboardPage route */}
        </Routes>
        <div className='mt-auto self-center'>
          <div className="card mt-auto">
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
            <h1>{!data ? "Loading..." : data}</h1>
          </div>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
