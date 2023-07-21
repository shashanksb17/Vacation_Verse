import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './components/Home.jsx';
import HostLogin from './components/HostLogin.js';
import HostSignup from "./components/HostSignup.js"
import HostAccount from "./components/HostAccount.js"

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<HostLogin/>} />
        <Route path="/signup" element={<HostSignup/>} />
        <Route path="/account/:hostId" element={<HostAccount/>} />
  
      </Routes>
   
  );
};

export default App;