// client/src/pages/AdminLoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/adminLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      navigate('/home/admin');
    } else {
      alert(data.errorMessage);
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-slate-200 mx-2 px-2 border border-black rounded"
          />
        </div>
        <div className="my-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-slate-200 mx-2 px-2 border border-black rounded"
          />
        </div>
        <button type="submit" className="bg-slate-200 mx-2 px-2 border border-black rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
