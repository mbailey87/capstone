import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/photos/logo.webp";

const Navbar = () => {
  return (
    <div className="">
      <nav className="flex justify-between items-center p-4">
        <img src={logo} alt="logo" className="w-24" />
        <ul className="flex space-x-8">
          <li className="hover:text-purple">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-purple">
            <Link to="/StudentLoginPage">Student Login</Link>
          </li>
          <li className="hover:text-purple">
            <Link to="/AdminLoginPage">Admin Login</Link>
          </li>
          <li className="hover:text-purple">
            <Link to="/RegistrationPage">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
//test

export default Navbar;
