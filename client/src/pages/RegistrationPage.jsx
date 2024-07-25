import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    telephone: '',
    address: '',
    password: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

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
        alert(data.message);
        navigate('/home/student'); // Redirect to Student Dashboard after successful registration
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
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          <div key={field} className="my-4">
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              placeholder={field.replace('_', ' ').toUpperCase()}
              value={formData[field]}
              onChange={handleChange}
              className="bg-slate-200 mx-2 px-2 border border-black rounded"
            />
          </div>
        ))}
        <button type="submit" className="bg-slate-200 mx-2 px-2 border border-black rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
