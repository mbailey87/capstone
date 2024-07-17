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
                <Link to="/studentLogin">Student Login</Link>
                </li>
                <li>
                <Link to="/adminLogin"><Admin></Admin> Login</Link>
                </li>
                <li>
                <Link to="/register">Register</Link>
                </li>
            </ul>
        </nav>
    );
    }

export default Navbar;