import React, { useState } from 'react';
import './LoginSignup.css';
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
    profilepicture: '',
    gender: '',
  });
  const [mode, setMode] = useState('login');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the login or signup API endpoint based on the selected mode
    if (mode === 'login') {
      // Call login API endpoint
      
      fetch('https://homestead.onrender.com/guest/login', {
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
            localStorage.setItem("guestToken",data.token)
            localStorage.setItem("guestName",data.name.name)
            MySwal.fire(
              'Login Successful',
              'Please click the button!',
              'success'
            )
            navigate('/properties', { replace: true });
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
          // Handle login error
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
      fetch('https://homestead.onrender.com/guest/register', {
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
          if(data.success){
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
        <img id='img' src="https://iili.io/HpXyA4s.jpg" alt="" />
      </div>
      <div className="form-container">
        <h1>{mode === 'login' ? 'Login' : 'Sign Up'}</h1>
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
              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="text"
                  id="profilepicture"
                  name="profilepicture"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
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
