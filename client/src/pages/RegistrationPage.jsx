// client/src/pages/RegistrationPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [userInfo, setUserInfo] = useState({
    role: 'student',
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    telephone: '',
    address: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });
    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      navigate('/StudentLoginPage');
    } else {
      alert(data.errorMessage);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={userInfo.username}
            onChange={handleChange}
            className="bg-slate-200 mx-2 px-2 border border-black rounded"
          />
        </div>
        <div className="my-4">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={userInfo.first_name}
            onChange={handleChange}
            className="bg-slate-200 mx-2 px-2 border border-black rounded"
          />
        </div>
        <div className="my-4">
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={userInfo.last_name}
            onChange={handleChange}
            className="bg-slate-200 mx-2 px-2 border border-black rounded"
          />
        </div>
        <div className="my-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={handleChange}
            className="bg-slate-200 mx-2 px-2 border border-black rounded"
          />
        </div>
        <div className="my-4">
          <input
            type="text"
            name="telephone"
            placeholder="Telephone"
            value={userInfo.telephone}
            onChange={handleChange}
            className="bg-slate-200 mx-2 px-2 border border-black rounded"
          />
        </div>
        <div className="my-4">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={userInfo.address}
            onChange={handleChange}
            className="bg-slate-200 mx-2 px-2 border border-black rounded"
          />
        </div>
        <div className="my-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userInfo.password}
            onChange={handleChange}
            className="bg-slate-200 mx-2 px-2 border border-black rounded"
          />
        </div>
        <button type="submit" className="bg-slate-200 mx-2 px-2 border border-black rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
