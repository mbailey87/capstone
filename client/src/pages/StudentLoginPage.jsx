import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentLoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Send POST request to server with login info
        const response = await fetch("/server/studentLogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();
        
        // If user info is valid, store token and navigate to home page, otherwise display error
        if (response.ok) {
            localStorage.setItem("token", data.token);
            navigate("/home/student");
        } else {
            setErrorMessage(data.errorMessage);
        };
    };

    return (
        <>
            <h1>Student Login</h1>
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
            {errorMessage && <p>{errorMessage}</p>}
        </>
    )
}

export default StudentLoginPage;