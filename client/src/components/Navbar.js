import { useState } from 'react';
import logo from '../assets/logo.png'; 
import './Navbar.css'; // Your navbar styles

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
      <img 
          src={logo} 
          alt="Toledo Home Healthcare Logo" 
          className="logo"
        />
          </div>

      {/* Hamburger Button */}
      <button 
        className={`hamburger ${isOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigation Links */}
      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <a href="/">Home</a>
        <a href="/services">Services</a>
        <a href="/careers">Careers</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
