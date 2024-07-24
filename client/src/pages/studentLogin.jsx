import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const StudentLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/studentLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const contentType = response.headers.get('content-type');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Save the token to localStorage
        navigate('/home/student'); // Redirect to Student Dashboard
      } else {
        throw new Error('Unexpected content type: ' + contentType);
      }
    } catch (err) {
      console.error("Fetch error: ", err);
      alert(err.message);
    }
  };

  return (
    <div>
      <h1>Student Login</h1>
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

export default StudentLoginPage;
