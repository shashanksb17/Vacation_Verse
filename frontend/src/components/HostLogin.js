import React from 'react';

import HostLoginForm from './HostLoginFrom';

const HostLogin = () => {
 
  const handleLogin = (data) => {
    // Handle the login data if needed (e.g., store user data, redirect to another page)
    console.log('Login successful!', data);
  };

  return (
    <div>
      <h1>Host Login</h1>
      <HostLoginForm onLogin={handleLogin} />
    </div>
  );
};

export default HostLogin;