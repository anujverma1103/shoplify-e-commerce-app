'use client';

import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Header.css';

/**
 * Header Component
 * Navigation bar with branding, menu links, and user controls
 */
export default function Header() {
  const navigate = useNavigate();
  const { user, token, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <h1>Shoplify</h1>
        </Link>

        {/* Navigation Menu */}
        {/* <nav className="nav-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/products" className="nav-link">
            Products
          </Link>
        </nav> */}

        {/* Right Side Actions */}
        <div className="header-actions">
          {/* Cart Icon */}
          <Link to="/cart" className="cart-link">
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>

          {/* User Menu */}
          {token ? (
            <div className="user-menu">
              <span className="welcome-text">Welcome, {user?.name}!</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="btn-login">
                Login
              </Link>
              <Link to="/register" className="btn-register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
