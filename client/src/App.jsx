// client/src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLoginPage from './pages/AdminLoginPage';
import StudentLoginPage from './pages/StudentLoginPage';
import RegistrationPage from './pages/RegistrationPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import CoursesPage from './pages/CoursesPage';

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/server/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <>
    <div className='flex flex-col h-full '>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/adminLogin" element={<AdminLoginPage />} />
          <Route path="/studentLogin" element={<StudentLoginPage />} />
          <Route path="/RegistrationPage" element={<RegistrationPage />} />
          <Route path="/home/student" element={<StudentDashboardPage />} />
          <Route path="/home/courses" element={<CoursesPage />} />
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
    </>
  );
}

export default App;