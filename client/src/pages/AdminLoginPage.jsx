import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const AdminLoginPage = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        // Add code here to handle student login
    }
    return (
        <>
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default AdminLoginPage;