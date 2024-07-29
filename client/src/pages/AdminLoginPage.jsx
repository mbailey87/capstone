import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/adminLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }) // Convert the data to JSON string
      });

      const contentType = response.headers.get('content-type');

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      } else if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        onLogin(data.token); // Call onLogin with the token
        navigate('/admin-dashboard'); // Redirect to the admin dashboard
      } else {
        throw new Error('Unexpected content type: ' + contentType);
      }
    } catch (err) {
      setError(err.message);
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
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLoginPage;
