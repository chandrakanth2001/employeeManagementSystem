import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
   
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        
      </div>
      <button className="navbar-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/admin">Employees</Link></li>
          
        </ul>
        <button onClick={handleLogout} className="navbar-login">Log Out</button>
      </div>
    </nav>
  );
};

export default NavBar;
