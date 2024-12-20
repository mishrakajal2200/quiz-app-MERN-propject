
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaUser, FaLock } from 'react-icons/fa';
import { MdCheckCircle } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signup.css';

const Signup = ({ setAuthData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    fullName:'',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username); // Save username to localStorage
      localStorage.setItem('fullName',response.data.fullName);
      setAuthData({ token: response.data.token, username: response.data.username });
      toast.success('Account created successfully!');

      // Delay navigation to give time for the toast message to appear
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Adjust the delay as needed (e.g., 2000ms = 2 seconds)
    } catch (error) {
      console.error('Error during signup:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Error during signup!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page d-flex justify-content-center bg-lightgray align-items-center vh-100">
      <ToastContainer position="top-right" />
      <div className="bg-white shadow-lg p-3 px-5 rounded col-lg-4 col-sm-6 col-md-6 col-10 align-items-center">
        <div className="justify-content-center align-items-center d-flex">
          <img
            src="https://cdn4.iconfinder.com/data/icons/ui-3d-01-of-3/100/UI_26-512.png"
            alt="Signup Icon"
            className="img-fluid col-4 col-lg-3 col-sm-3 col-md-3"
          />
        </div>

        <form onSubmit={handleSubmit} className='col-12'>
          <h3 className="text-center">Create Account</h3>

          {/* Name Field */}
          <div className="input-group mb-3">
            <span className="input-group-text bg-info">
              <FaUser style={{ color: 'white'}}/>
            </span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Name"
              className="form-control"
              required
               autoComplete="off"
            />
          </div>

          {/* full name */}
          <div className="input-group mb-3">
            <span className="input-group-text bg-info">
              <FaUser style={{ color: 'white'}}/>
            </span>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="form-control"
              required
              autoComplete="off"
            />
          </div>

          {/* Email Field */}
          <div className="input-group mb-3">
            <span className="input-group-text bg-success">
              <FaEnvelope style={{ color: 'white' }} />
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="form-control"
              required
              autoComplete="off"
            />
          </div>

          {/* Password Field */}
          <div className="input-group mb-3">
            <span className="input-group-text bg-danger">
              <FaLock style={{ color: 'white' }} />
            </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-control"
              required
              autoComplete="new-password"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="input-group mb-3">
            <span className="input-group-text bg-warning">
              <MdCheckCircle style={{ color: 'white' }} />
            </span>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="ConfirmPassword"
              className="form-control"
              required
              autoComplete="new-password"
            />
          </div>

          {/* Submit Button */}
          <div className="justify-content-center align-items-center d-flex">
            <button
              type="submit"
              className="btn btn-success col-6 col-lg-7 rounded-pill"
            >
              {isLoading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
        </form>

        <p className="mt-3">
          Already Have An Account? <Link to="/" className="text-decoration-none">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
