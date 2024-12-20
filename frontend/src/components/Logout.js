import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setAuthData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token from localStorage and clear the authentication data
    localStorage.removeItem('token');
    setAuthData({ token: '', username: '' });

    // Redirect the user to the login page
    navigate('/login');
  }, [navigate, setAuthData]);

  return null; // No UI needed for this component, it just handles the logic
};

export default Logout;
