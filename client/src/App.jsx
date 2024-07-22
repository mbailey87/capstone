// client/src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLoginPage from './pages/AdminLoginPage';
import StudentLoginPage from './pages/StudentLoginPage';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage'; // Import the HomePage component

function App() {
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Add the Home route */}
          <Route path="/AdminLoginPage" element={<AdminLoginPage />} />
          <Route path="/StudentLoginPage" element={<StudentLoginPage />} />
          <Route path="/RegistrationPage" element={<RegistrationPage />} />
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
