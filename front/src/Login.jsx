import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(""); 
    const [successMessage, setSuccessMessage] = useState("");
    const [voteError, setVoteError] = useState(""); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const role = localStorage.getItem('role');
            if (role === 'voter') {
                navigate('/vote');
            } else if (role === 'admin') {
                navigate('/Admin'); 
            }
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const login = async () => {
        try {
            const res = await axios.post(`http://localhost:4000/login`, user);
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', res.data.role); 
                if (res.data.role === 'voter') {
                    navigate('/vote');
                } else if (res.data.role === 'admin') {
                    navigate('/Admin'); 
                } else {
                    console.log("Unknown user role");
                    setError("Login failed");
                }
            } else {
                console.log(res.data);
                setError("Login failed");
            }
        } catch (error) {
            console.error('Error logging in:', error);
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);                        
            } else if (error.response && error.response.data && error.response.data.voteError) { 
                setVoteError(error.response.data.voteError); 
            } else {
                setError("Failed to login. Please try again.");
            }
        }
    };

    return (
        <div className='container-fluid loginbackground' style={{ marginTop: '100px' }}>
            {voteError && <div className="alert alert-danger">{voteError}</div>} 
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4 p-5 loginForm" style={{ background: "rgb(240, 240, 240)" }}>
                    {successMessage && <div className="alert alert-success">{successMessage}</div>} 
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="row">
                        <h5 className='text-center' style={{ color: "rgb(7, 36, 62)" }}>Login Here</h5>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control inputLogin" placeholder="Email" name="email" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control inputLogin" placeholder="Password" name='password' onChange={handleChange} />
                    </div>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <NavLink to='/Register'>
                                <button className="btn btn-block btn-dark">Register</button>
                            </NavLink>
                        </div>
                        <div className="col-6">
                            <button type="button" onClick={login} className="btn btn-block btn-dark">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
