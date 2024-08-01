import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    telephone: '',
    address: '',
    password: '',
    role: 'student' // Default role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const contentType = response.headers.get('content-type');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        alert(`Welcome ${formData.username}!`);
        navigate('/admin/registration'); // Redirect to admin registration page after successful registration
      } else {
        throw new Error('Unexpected content type: ' + contentType);
      }
    } catch (err) {
      console.error("Fetch error: ", err);
      alert(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-purple-700">Register</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        {Object.keys(formData).map((field) => (
          field !== 'password' && field !== 'role' ? (
            <div key={field} className="my-4">
              <input
                type="text"
                name={field}
                placeholder={field.replace('_', ' ').toUpperCase()}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ) : null
        ))}
        <div className="my-4">
          <input
            type="password"
            name="password"
            placeholder="PASSWORD"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="my-4">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded bg-gold">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
