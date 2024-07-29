import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/photos/logo.webp';

const Navbar = () => {
  return (
    <nav>
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">
          <Link to="/">
            <img className="w-24" src={logo} alt="" />
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-purple">Home</Link>
          <Link to="/admin-login" className="hover:text-purple">Admin Login</Link>
          <Link to="/student-login" className="hover:text-purple">Student Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
