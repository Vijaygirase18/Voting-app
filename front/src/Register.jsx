import React, { useState } from "react";
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
        name: "",
        number: ""
    });
    const [message, setMessage] = useState(""); 

    const registration = () => {
        const { email, password, name, number } = user;
       
        if (!email || !password || !name || !number) {
            setMessage("All fields are required");
            return;
        }
        if (!validateEmail(email)) {
            setMessage("Invalid email address");
            return;
        }
        if (!validatePassword(password)) {
            setMessage("Password must be at least 6 characters long");
            return;
        }
        if (!validateNumber(number)) {
            setMessage("Mobile number must be numeric");
            return;
        }

        axios.post(`http://localhost:4000/Register`, user)
            .then((res) => {
                setMessage(res.data.msg || res.data.error); 
                if (res.data.msg) {
                    
                    setUser({
                        email: "",
                        password: "",
                        name: "",
                        number: ""
                    });
                }
            })
            .catch(error => {
                console.error('Error registering user:', error);
                setMessage("Something went wrong");
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setMessage(""); 
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const validateNumber = (number) => {
        const regex = /^\d+$/;
        return regex.test(number);
    };

    return (
        <div className="container-fluid loginbackground" style={{ marginTop: '80px' }}>
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4 p-5 loginForm" style={{ background: "rgb(240, 240, 240)" }}>
                    <div className="row">
                        <h5 className="text-center" style={{ color: "rgb(7,36,62)" }}>Register Here</h5>
                    </div>
                    {message && <div className={`mb-3 text-${message.startsWith('All fields') || message.startsWith('Invalid') || message.startsWith('Password') ? 'danger' : 'success'}`}>{message}</div>} 
                    <div className="mb-3">
                        <input type="text" className="form-control inputLogin" placeholder="UserName" name="name" value={user.name} onChange={handleChange} />
                        {!user.name && <div className="text-muted">Please enter your username</div>}
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control inputLogin" placeholder="Email address" name="email" value={user.email} onChange={handleChange} />
                        {!user.email && <div className="text-muted">for.example Vks@gmail.com</div>}
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control inputLogin" placeholder="Password" name='password' value={user.password} onChange={handleChange} />
                        {!user.password && <div className="text-muted">password must be 6 character or naumber</div>}
                    </div>
                    <div className="mb-3">
                        <input type="number" className="form-control inputLogin" placeholder="Mobile No" name='number' value={user.number} onChange={handleChange} />
                        {!user.number && <div className="text-muted">Please enter your mobile number</div>}
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-12 col-md-6 mb-2 mb-md-0">
                            <button type="button" onClick={registration} className="btn btn-primary w-100">Register</button>
                        </div>
                        <div className="col-12 col-md-6">
                            <button type="button" className="btn btn-primary w-100">
                                <NavLink to='/' style={{ textDecoration: "none", color: "white" }}>Login</NavLink>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
