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
    role: 'student' // Default role is student
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
      const response = await fetch('/createUser', {
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
        alert(`User ${formData.username} created successfully!`);
        navigate('/student-login'); // Redirect to Student Login after successful registration
      } else {
        throw new Error('Unexpected content type: ' + contentType);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          field !== 'role' && (
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
          )
        ))}
        <div className="my-4">
         
            <select name="role" value={formData.role} onChange={handleChange} className="bg-slate-200 mx-2 px-2 border border-black rounded">
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
         
        </div>
        <button type="submit" className="bg-slate-200 mx-2 px-2 border border-black rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
