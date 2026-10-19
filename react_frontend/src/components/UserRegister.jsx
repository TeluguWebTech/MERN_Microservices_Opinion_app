import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userRegisterUrl } from '../api_url';
import axios from 'axios';
import './UserRegister.css';

const UserRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(userRegisterUrl, {
                name,
                email,
                password
            });

            console.log(response.data);
            alert('Registration successful!');
        } catch (error) {
            console.error(
                'Registration error:',
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.msg ||
                'Registration failed. Please try again.'
            );
        }
    };

    return (
        <div className="registerPage">
            <div className="registerCard">

                <div className="registerHeader">
                    <Link to="/" className="registerLogo">
                        Opinion<span>Hub</span>
                    </Link>

                    <h1>Create Your Account</h1>
                    <p>Join the conversation and share your opinions.</p>
                </div>

                <form onSubmit={userHandler} className="registerForm">
                    <div className="registerField">
                        <label htmlFor="name">User Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="name"
                            required
                        />
                    </div>

                    <div className="registerField">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="registerField">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            minLength={6}
                            required
                        />
                    </div>

                    <button type="submit" className="registerButton">
                        Create Account
                    </button>
                </form>

                <div className="registerLoginPrompt">
                    <p>Already have an account?</p>
                    <Link to="/login" className="registerLoginLink">
                        Login here
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default UserRegister;