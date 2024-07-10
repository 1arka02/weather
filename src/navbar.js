import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ onSearch, onSave }) => {
    const [location, setLocation] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleInputChange = (e) => {
        setLocation(e.target.value);
    };

    const handleSearch = () => {
        onSearch(location);
    };

    const handleSave = () => {
        onSave(location);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
               <div className="navbar-logo">Weatherly</div>
                <div className="navbar-search">
                    <input
                        type="text"
                        placeholder="Enter location"
                        value={location}
                        onChange={handleInputChange}
                        className="navbar-input"
                    />
                    <button onClick={handleSearch} className="navbar-button">
                        Search
                    </button>
                </div>
                <ul className={`navbar-menu ${isOpen ?'open':''}`}>
                    <li className="navbar-item">
                        <Link to="/" className="navbar-links">
                            Home
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/daily-forecast" className="navbar-links">
                            Daily Forecast
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/Saved-Locations" className="navbar-links">
                            Saved Locations
                        </Link>
                    </li>
                </ul>
                <div className="navbar-hamburger" onClick={toggleMenu}>
                    <div className={`bar1 ${isOpen ? 'open' : ''}`}></div>
                    <div className={`bar2 ${isOpen ? 'open' : ''}`}></div>
                    <div className={`bar3 ${isOpen ? 'open' : ''}`}></div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
