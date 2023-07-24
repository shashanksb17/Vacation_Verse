// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home.jsx';

import HostAccount from './components/HostAccount.js';
import ProductDetail from './components/ProductDetailPage/ProductDetail.jsx';

import LoginSignup from './components/GuestLogin/LoginSignup.jsx';
import HostLoginSignup from "./components/HostLogin/HostLoginSignup.jsx"
import PaymentPage from './components/PaymentPage/PaymentPage.jsx';
import Navigation from './components/Navigation/Navigation.js';
const App = () => {
 
  return (
  <div>
      <div>
          <Navigation/>
        </div>
      <Routes>
   
        <Route path="/" element={<Home />} />
        <Route path="/HostLogin" element={<HostLoginSignup />} />
        <Route path="/LoginSignup" element={<LoginSignup />} />
        <Route path="/account/:hostId" element={<HostAccount />} />
        <Route path="/detail/:Id" element={<ProductDetail />} />
        <Route
          path="/payment/:id"
          element={<PaymentPage />}
        />
      </Routes>
   
      </div>
     
  );
};

export default App;
