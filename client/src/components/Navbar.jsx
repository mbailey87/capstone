import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/photos/logo.webp"

const Navbar = () => {
  return (
    <>
    <nav className="flex justify-between">
      <img className="w-24" src={logo}alt="" />
      <ul className="flex justify-between w-1/2">
        <li className="hover:text-purple">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-purple">
          <Link to="/studentLogin">Student Login</Link>
        </li>
        <li className="hover:text-purple">
          <Link to="/adminLogin">Admin Login</Link>
        </li>
        <li className="hover:text-purple">
          <Link to="/RegistrationPage">Register</Link>
        </li>
      </ul>
    </nav>
    </>
  );
};
//test
//test 2
export default Navbar;