import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoggedInNavbar from './components/LoggedInNavbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import CoursesPage from './pages/CoursesPage';
import ManageCoursesPage from './pages/ManageCoursesPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';

const App = () => {
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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem('token');
  };

  const handleLogin = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setIsLoggedIn(true);
      setIsAdmin(payload.admin);
    }
  };

  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        {isLoggedIn ? <LoggedInNavbar isAdmin={isAdmin} onLogout={handleLogout} /> : <Navbar />}
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/student-dashboard" element={<ProtectedRoute element={StudentDashboardPage} isLoggedIn={isLoggedIn} />} />
          <Route path="/admin-dashboard" element={<ProtectedRoute element={AdminDashboardPage} isAdmin={isAdmin} />} />
          <Route path="/admin/manage-courses" element={<ProtectedRoute element={ManageCoursesPage} isAdmin={isAdmin} />} />
          <Route path="/admin/registration" element={<ProtectedRoute element={RegistrationPage} isAdmin={isAdmin} />} />
          <Route path="/courses" element={<ProtectedRoute element={CoursesPage} isLoggedIn={isLoggedIn} />} />
          <Route path="/profile" element={<ProtectedRoute element={ProfilePage} isLoggedIn={isLoggedIn} />} />
          <Route path="*" element={<Navigate to={isLoggedIn ? (isAdmin ? "/admin-dashboard" : "/student-dashboard") : "/login"} />} />
        </Routes>
        <div className='mt-auto self-center'>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
