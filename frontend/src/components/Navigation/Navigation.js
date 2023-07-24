// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/HostLogin">Host Login</Link>
        </li>

        <li>
          <Link to="/LoginSignup">Guest Login</Link>
        </li>
        {/* Add more navigation links here as needed */}
      </ul>
    </nav>
  );
};

export default Navigation;
