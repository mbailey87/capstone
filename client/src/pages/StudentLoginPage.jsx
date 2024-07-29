import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to server with login credentials
      const response = await fetch("/studentLogin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Get content type from response headers
      const contentType = response.headers.get('content-type');

      // If response is not OK, throw error
      if (!response.ok) {
        const errorText = await response.text(); // Get error text
        console.error('Response text:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      } 
      // If content type is JSON, parse response, store token, and redirect to student dashboard
      else if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Response data:', data);
        localStorage.setItem('token', data.token);
        navigate('/student-dashboard');
      }
      // If content type is not JSON, throw error
      else {
        throw new Error('Unexpected content type: ' + contentType);
      }
    } catch (err) {
      // Log and alert any errors that occur during fetch operation
      console.error("Fetch error: ", err);
      alert(err.message);
    };
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
