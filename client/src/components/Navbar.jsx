import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/StudentLoginPage">Student Login</Link>
        </li>
        <li>
          <Link to="/AdminLoginPage">Admin Login</Link>
        </li>
        <li>
          <Link to="/RegistrationPage">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
