import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate   = useNavigate();
  const isLoggedIn = localStorage.getItem('loggedin') === 'true';
  const role       = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth/login');
  };

  const profilePath = role === 'biller'
    ? '/biller/profile'
    : role === 'customer'
      ? '/customer/profile'
      : '/';

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo">
        Bill Payment
      </NavLink>

      <ul className="navbar-links">
        {!isLoggedIn ? (
          <>
            <li>
              <NavLink to="/auth/login"  className="nav-btn">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/auth/signup" className="nav-btn">
                Sign Up
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to={profilePath} className="nav-btn">
                Profile
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="nav-btn logout-btn">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
