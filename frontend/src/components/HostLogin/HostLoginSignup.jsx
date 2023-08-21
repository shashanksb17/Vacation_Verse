// LoginSignup.js

import React, { useState } from 'react';
import './HostLoginSignup.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const LoginSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    dob: '',
    gender: '',
    location: '',
    profilePicture: '',
    about: '',
    hostingSince: '',
    hostStatus: false,
  });

  const [mode, setMode] = useState('login');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the login or signup API endpoint based on the selected mode
    if (mode === 'login') {
      // Call login API endpoint
      fetch('https://homestead.onrender.com/host/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle login response
          console.log('Login:', data);
          if(data.success){
            localStorage.setItem("hostToken",data.token)
            localStorage.setItem("hostName",data.name)
            MySwal.fire(
              'Login Successful',
              'Please click the button!',
              'success'
            )      
            navigate('/HostProfile');
          }
          else if(data.message=="Invalid credentials"){
            MySwal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Invalid credentials',
              
            })
          }
          else{
            MySwal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Failed to Authenticate User',
              
            })
          }
        })
        .catch((error) => {
          console.error('Login error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
        });
    } else {
      // Call signup API endpoint
      fetch('https://homestead.onrender.com/host/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle signup response
          console.log('Signup:', data);
          if(data.message=="Host registered successfully"){
            MySwal.fire(
              'User Registered Successfully',
              'Please click the button!',
              'success'
            )
            //switch mode to login
          }
          else {
            MySwal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Failed to Register User',            
            })
          }
       
        })
        .catch((error) => {
          // Handle signup error
          console.error('Signup error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
        });
    }
  };

  return (
    <div className="login-signup-container">
      <div>
        <img id='img' src="https://iili.io/HpXbjvp.jpg" alt="" />
      </div>
      <div className="form-container">
      <h1>{mode === 'login' ? 'Host Login' : 'Host Sign Up'}</h1>
        <form onSubmit={handleSubmit}>
        {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {mode === 'signup' && (
            <>
              {/* New form fields for signup */}
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="profilePicture">Profile Picture</label>
                <input
                  type="text"
                  id="profilePicture"
                  name="profilePicture"
                  value={formData.profilePicture}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="about">About</label>
                <textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="hostingSince">Hosting Since</label>
                <input
                  type="date"
                  id="hostingSince"
                  name="hostingSince"
                  value={formData.hostingSince}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="hostStatus">Host Status</label>
                <input
                  type="checkbox"
                  id="hostStatus"
                  name="hostStatus"
                  checked={formData.hostStatus}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <input type="submit" value={mode === 'login' ? 'Login' : 'Sign Up'} />
          </div>
        </form>
        
        <div className="mode-switch">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <span onClick={() => setMode('signup')}>Sign Up</span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span onClick={() => setMode('login')}>Login</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
