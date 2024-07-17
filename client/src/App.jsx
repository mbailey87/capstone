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

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/AdminLoginPage" element={<AdminLoginPage />} />
          <Route path="/StudentLoginPage" element={<StudentLoginPage />} />
          <Route path="/RegistrationPage" element={<RegistrationPage />} />
        </Routes>
        <div className="card">
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
          <h1>{!data ? "Loading..." : data}</h1>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
