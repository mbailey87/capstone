import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/photos/logo.webp';

const LoggedInNavbar = ({ isAdmin, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/');
  };

  return (
    <nav>
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">
          <Link to="/">
            <img className="w-24" src={logo} alt="" />
          </Link>
        </div>
        <div className="flex space-x-4">
          {isAdmin ? (
            <>
              <Link to="/admin-dashboard" className="hover:text-purple">Admin Dashboard</Link>
              <Link to="/admin/registration" className="hover:text-purple">Register New User</Link>
              <Link to="/admin/manage-courses" className="hover:text-purple">Manage Courses</Link>
            </>
          ) : (
            <>
              <Link to="/student-dashboard" className="hover:text-purple">Student Dashboard</Link>
              <Link to="/profile" className="hover:text-purple">Profile</Link> {/* Profile link for Student */}
            </>
          )}
          <button onClick={handleLogout} className="hover:text-purple">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default LoggedInNavbar;
