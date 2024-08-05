import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/photos/logo.webp';

const Navbar = () => {
  return (
    <nav className="bg-purple-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-purple text-xl">
          <Link to="/">
            <img className="w-24" src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="text-purple hover:text-gold">Home</Link>
          <Link to="/login" className="text-purple hover:text-gold">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
