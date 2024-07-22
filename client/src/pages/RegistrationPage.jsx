import React from "react";
import { useState } from "react";

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        firstName: "",
        lastName: "",
        telephone: ""
    });
    const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add code here to handle form submission
    };

    return (
        <>
            <div>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>First Name:</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Telephone:</label>
                        <input type="text" name="telephone" value={formData.telephone} onChange={handleChange}/>
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    )

}

export default RegistrationPage;