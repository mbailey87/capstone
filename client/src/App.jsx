import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import LoggedInNavbar from './components/LoggedInNavbar';
import Footer from './components/Footer';
import AdminLoginPage from './pages/AdminLoginPage';
import StudentLoginPage from './pages/StudentLoginPage';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import CoursesPage from './pages/CoursesPage';
import ManageCoursesPage from './pages/ManageCoursesPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setIsLoggedIn(true);
      setIsAdmin(payload.admin);
    }
  }, []);

  const handleLogin = (admin) => {
    setIsLoggedIn(true);
    setIsAdmin(admin);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem('token');
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Router>
        {isLoggedIn ? <LoggedInNavbar isAdmin={isAdmin} onLogout={handleLogout} /> : <Navbar />}
        <Routes>
          <Route path="/admin-login" element={<AdminLoginPage onLogin={handleLogin} />} />
          <Route path="/student-login" element={<StudentLoginPage onLogin={handleLogin} />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/student-dashboard"
            element={<ProtectedRoute element={StudentDashboardPage} />}
          />
          <Route
            path="/admin-dashboard"
            element={<ProtectedRoute element={AdminDashboardPage} />}
          />
          <Route
            path="/courses"
            element={<ProtectedRoute element={CoursesPage} />}
          />
          <Route
            path="/manage-courses"
            element={<ProtectedRoute element={ManageCoursesPage} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={ProfilePage} />}
          />
        </Routes>
        <div className='mt-auto self-center'>
          <div className="card mt-auto">
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
