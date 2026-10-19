
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(
        Boolean(localStorage.getItem('user_token'))
    );

    useEffect(() => {
        const checkLoginStatus = () => {
            setIsLoggedIn(Boolean(localStorage.getItem('user_token')));
        };

        // Listen for login/logout in this tab
        window.addEventListener('authChange', checkLoginStatus);
        

        // Also sync if localStorage changes in another tab
        window.addEventListener('storage', checkLoginStatus);

        return () => {
            window.removeEventListener('authChange', checkLoginStatus);
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('user_token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('user_name');

        window.dispatchEvent(new Event('authChange'));
        navigate('/', { replace: true });
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Opinion<span>Hub</span>
                </Link>

                <div className="navbar-links">
                    <Link to="/" className="navbar-link">
                        Home
                    </Link>

                    {isLoggedIn ? (
                        <button
                            type="button"
                            className="navbar-logout"
                            onClick={logoutHandler}
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/user/login" className="navbar-login">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
