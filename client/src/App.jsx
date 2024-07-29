import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLoginPage from './pages/AdminLoginPage';
import StudentLoginPage from './pages/StudentLoginPage';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import CoursesPage from './pages/CoursesPage';

function App() {
  const [data, setData] = useState(null); // Declare and initialize the data variable

  useEffect(() => {
    fetch("/server/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/student-login" element={<StudentLoginPage />} />
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
