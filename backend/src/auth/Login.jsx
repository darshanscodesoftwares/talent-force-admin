import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { CiAt } from "react-icons/ci";
import { GoLock } from "react-icons/go";
import logo from "../assets/talfrc.svg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Hardcoded
    const TEST_EMAIL = "talentforce@gmail.com";
    const TEST_PASSWORD = "123456";

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === TEST_EMAIL && password === TEST_PASSWORD) {
            console.log("Login successful");
            navigate("/dashboard"); // go to MainLayout
        } else {
            alert("Invalid email or password");
        }
    };

    return (

        <div className="login-container">
            <div className="greet-card">

                <img src={logo} alt="TalentForce Logo" className="login-logo" />

                <div className="login-title-wrap">
                    <h2 className="login1">Welcome Back</h2>
                    <h2 className="login2">Please Sign In To Continue</h2>
                </div>
                <div className="login-card">
                    <form className="login-form" onSubmit={handleSubmit}>

                        <div className="form-group input-with-icon">
                            <label>Email</label>
                            <div className="input-wrapper">
                                <CiAt className="input-icon" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>



                        <div className="form-group input-with-icon">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <GoLock className="input-icon" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-options">

                            <label className="remember-me">
                                <div className="tick-wrap">
                                    <input type="checkbox" />
                                    <p>Remember Me</p>
                                </div>
                            </label>
                            <a href="#" className="forgot-password">Forgot Password?</a>
                        </div>



                        <button type="submit" className="login-btn">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
