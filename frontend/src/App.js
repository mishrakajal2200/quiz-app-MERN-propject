
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Quiz from './components/Quiz';
import Details from './components/Details';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [authData, setAuthData] = useState(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return token && username ? { token, username } : null;
  });

  // Force reset authData to null on page load
  useEffect(() => {
    setAuthData(null); // Reset authentication state on every page load
  }, []);

  return (
    <Router>
      <AppContent authData={authData} setAuthData={setAuthData} />
      <ToastContainer position="top-center" autoClose={2000} />
    </Router>
  );
}

function AppContent({ authData, setAuthData }) {
  const location = useLocation();

  // Paths where Navbar should be hidden
  const hideNavbarPaths = ['/login', '/signup'];

  // Function to protect routes if the user is not authenticated
  const ProtectedRoute = ({ element }) => {
    return authData ? element : <Navigate to="/login" />;
  };

  // Redirect authenticated users from login and signup pages to Home
  const RedirectIfAuthenticated = ({ element }) => {
    return authData ? <Navigate to="/home" /> : element;
  };

  return (
    <>
      {/* Conditionally render Navbar based on the current path */}
      {!hideNavbarPaths.includes(location.pathname) && (
        <Navbar authData={authData} setAuthData={setAuthData} />
      )}

      <Routes>
        {/* Redirect authenticated users from login and signup pages */}
        <Route
          path="/login"
          element={<RedirectIfAuthenticated element={<Login setAuthData={setAuthData} />} />}
        />
        <Route
          path="/signup"
          element={<RedirectIfAuthenticated element={<Signup setAuthData={setAuthData} />} />}
        />

        {/* Default route: Always redirect to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Protected routes */}
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/about" element={<ProtectedRoute element={<About />} />} />
        <Route path="/contact" element={<ProtectedRoute element={<Contact />} />} />
        <Route path="/quiz" element={<ProtectedRoute element={<Quiz />} />} />
        <Route path="/details" element={<ProtectedRoute element={<Details />} />} />
      </Routes>
    </>
  );
}

export default App;
