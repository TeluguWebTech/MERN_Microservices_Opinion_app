import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userLoginUrl } from '../api_url';
import './UserLogin.css';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

const userHandler = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(userLoginUrl, {
            email,
            password
        });

        const data = response.data;

        if (data.msg === 'user login success' && data.token) {
            localStorage.setItem('user_token', data.token);
            localStorage.setItem('userName', data.record.name);
            localStorage.setItem('userId', data.record._id);

            // Update Navbar immediately, without refreshing
            window.dispatchEvent(new Event('authChange'));

            alert('Login successful!');
            navigate('/', { replace: true });
        } else {
            alert(data.msg || 'Login failed. Please try again.');
        }
    } catch (error) {
        console.error(
            'Login error:',
            error.response?.data || error.message
        );

        alert(
            error.response?.data?.msg ||
            'Login failed. Please check your credentials.'
        );
    }
};
    return (
        <div className="loginPage">
            <div className="loginCard">

                <div className="loginHeader">
                    <Link to="/" className="loginLogo">
                        Opinion<span>Hub</span>
                    </Link>

                  
                    <p>Login to share your opinions and join the discussion.</p>
                </div>

                <form onSubmit={userHandler} className="loginForm">
                    <div className="loginField">
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

                    <div className="loginField">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="loginButton"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login to Your Account'}
                    </button>
                </form>

                <div className="registerPrompt">
                    <p>Don't have an account yet?</p>
                    <Link to="/user/register" className="registerLink">
                        Create an account
                    </Link>
                </div>

                <Link to="/" className="backHome">
                    ← Back to Home
                </Link>

            </div>
        </div>
    );
};

export default UserLogin;