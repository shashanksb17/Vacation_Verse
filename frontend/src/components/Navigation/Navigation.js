import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Navigation.css';
// eslint-disable-next-line


const handleSignout = () => {
  // Clear the guestToken from session storage and perform logout logic
  localStorage.removeItem('guestName');
  localStorage.removeItem('hostName');
};

const Navigation = () => {
  const [showHostDropdown, setShowHostDropdown] = useState(false);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  const toggleHostDropdown = () => {
    setShowHostDropdown(!showHostDropdown);
    setShowGuestDropdown(false);
  };
// eslint-disable-next-line
  const toggleGuestDropdown = () => {
    setShowGuestDropdown(!showGuestDropdown);
    setShowHostDropdown(false);
  };
  const hostName = localStorage.getItem('hostName');
  const guestName = localStorage.getItem('guestName');

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        Vacation<span className="verse">Verse</span>
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/properties">Properties</Link>
        </li>
        <li>
          <Link to="/bookings">Bookings</Link>
        </li>
        <li>
        {hostName || guestName ? (
          <Link>
            {hostName && <span>{hostName}</span>}
            {!hostName && guestName && <span>{guestName}</span>}
          </Link>
        ) : null}
        </li>
        <li onClick={toggleHostDropdown}>
          
          <div className="dropdown-toggle">
          <FontAwesomeIcon icon={faUser} className="icon" />
          </div>
          {showHostDropdown && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/HostLogin">Host</Link>
              </li>
              <li>
                <Link to="/LoginSignup">Guest</Link>
              </li>
              <li>
                <Link onClick={handleSignout}>Logout</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;