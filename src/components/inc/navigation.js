import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navigation.css'; // Make sure this is the path to your CSS file

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <div className="logo-brand">
          
          <Link to="/" className="navbar-brand">
          <img
            alt="Logo"
            src={require("../../assets/logo.png")} // Update the path as necessary
            className="logo"
          />
          </Link>
        </div>
        <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)}>
          <span className="toggler-icon">☰</span>
        </button>
        <div className={`navbar-menu ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/upload" className="nav-link">Upload Image</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
