import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"

const HostLoginForm = ({ onLogin }) => {
    const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Call the login API endpoint here
    fetch('http://localhost:5000/host/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the login response
        console.log('Login response:', data);
        const hostId= data.host_id
        onLogin(data);
        navigate(`/account/${hostId}`)
      })
      .catch((error) => {
        // Handle login error
        console.error('Login error:', error);
      });
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default HostLoginForm;