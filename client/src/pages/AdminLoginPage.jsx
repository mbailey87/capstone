import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  // State hooks to manage input fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send a POST request to the server with the login credentials
      const response = await fetch('/server/adminLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }) // Convert the data to JSON string
      });

      // Log the response status and headers for debugging
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Get the content type from the response headers
      const contentType = response.headers.get('content-type');

      // Check if the response is not OK (status code 200-299)
      if (!response.ok) {
        const errorText = await response.text(); // Get the error text
        console.error('Response text:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      } 
      // Check if the content type is JSON
      else if (contentType && contentType.includes('application/json')) {
        const data = await response.json(); // Parse the response as JSON
        console.log('Response data:', data);
        localStorage.setItem('token', data.token); // Store the token in local storage
        navigate('/admin-dashboard'); // Redirect to the admin dashboard
      } 
      // If the content type is not JSON, throw an error
      else {
        throw new Error('Unexpected content type: ' + contentType);
      }
    } catch (err) {
      // Log and alert any errors that occur during the fetch operation
      console.error("Fetch error: ", err);
      alert(err.message);
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
