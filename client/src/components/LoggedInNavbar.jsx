import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/photos/logo.webp';

const LoggedInNavbar = ({ isAdmin, onLogout }) => {
  return (
    <nav className="bg-purple-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-purple text-xl">
          <Link to="/">
            <img className="w-24" src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="flex space-x-4">
          {isAdmin ? (
            <>
              <Link to="/admin-dashboard" className="text-purple hover:text-gold">Admin Dashboard</Link>
              <Link to="/admin/manage-courses" className="text-purple hover:text-gold">Manage Courses</Link>
              <Link to="/admin/registration" className="text-purple hover:text-gold">Register User</Link>
            </>
          ) : (
            <>
              <Link to="/student-dashboard" className="text-purple hover:text-gold">Student Dashboard</Link>
              <Link to="/courses" className="text-purple hover:text-gold">Courses</Link>
            </>
          )}
          <Link to="/profile" className="text-purple hover:text-gold">Profile</Link>
          <button onClick={onLogout} className="text-purple hover:text-gold">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default LoggedInNavbar;
