
import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Modal,Button} from 'react-bootstrap';
import image from '../components/dev.jpg'

const Navbar = ({ authData, setAuthData }) => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  // Handle Logout with Confirmation
  const handleLogoutConfirm = () => {
   
   
      // Clear localStorage and auth state
      localStorage.removeItem('token');
      localStorage.removeItem('firstVisit');
      localStorage.removeItem('username');
      setAuthData(null);

      // Show success message and redirect to login
      toast.success("Logged out successfully!");


      // Close the modal
    setShowModal(false);
      // Redirect to login page after showing the toast
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Adjust the delay if needed
    
  };

  const handleLogoutClick = () => {
    setShowModal(true); // Show the modal when the user clicks logout
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal without logging out
  };

  return (
  //   <nav className="navbar navbar-expand-lg navbar-dark bg-primary h-2 sticky-top">
  //     <div className="container-fluid">

  //     <div className="d-flex justify-content-between align-items-center p-1">
  // {/* Left section with DevSir */}
  // <div className="d-flex align-items-center">
  //   <div className="bg-danger p-2 rounded-pill">
  //     <h5 className="text-white m-0">DevSir</h5>
  //   </div>
  // </div>

  // {/* Right section with Toggle Button */}
  // <button
  //   className="navbar-toggler"
  //   type="button"
  //   data-bs-toggle="collapse"
  //   data-bs-target="#navbarNav"
  //   aria-controls="navbarNav"
  //   aria-expanded="false"
  //   aria-label="Toggle navigation"
  // >
  //   <span className="navbar-toggler-icon"></span>
  // </button>
  //     </div>


  //       <div className="collapse navbar-collapse text-right" id="navbarNav">
  //         <ul className="navbar-nav ms-auto">
  //           <li className="nav-item">
  //             <Link className="nav-link text-white" to="/">
  //               Home
  //             </Link>
  //           </li>
  //           <li className="nav-item">
  //             <Link className="nav-link text-white" to="/about">
  //               About
  //             </Link>
  //           </li>
  //           <li className="nav-item">
  //             <Link className="nav-link text-white" to="/contact">
  //               Contact
  //             </Link>
  //           </li>
  //           {authData ? (
  //             <li className="nav-item">
  //               <button className="btn btn-danger nav-link" onClick={handleLogoutClick}>
  //                 <span className='text-white'>Logout</span>
  //               </button>
  //             </li>
  //           ) : (
  //             <li className="nav-item">
  //               <Link className="nav-link text-white" to="/">
  //                 Login
  //               </Link>
  //             </li>
  //           )}
  //         </ul>
  //       </div>
  //     </div>

  //     {/* Custom Modal for Logout Confirmation */}
  //     <Modal show={showModal} onHide={handleCloseModal}>
  //       <Modal.Header closeButton>
  //         <Modal.Title>Confirm Logout</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         Are you sure you want to log out?
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button variant="secondary" onClick={handleCloseModal}>No</Button>
  //         <Button variant="danger" onClick={handleLogoutConfirm}>Yes</Button>
  //       </Modal.Footer>
  //     </Modal>
  //   </nav>
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
  <div className="container-fluid">
    
    <div className="d-flex justify-content-between align-items-center p-1 w-100">
      {/* Left section with DevSir */}
      <div className="d-flex align-items-center">
        <div className="bg-danger p-2 rounded-pill">
          <h5 className="text-white m-0">DevSir</h5>
        </div>
      </div>

      {/* Right section with Toggle Button */}
      <button
        className="navbar-toggler "
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" style={{color:"black"}}></span>
      </button>
    </div>

    {/* Links below the toggle button on mobile screens */}
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/about">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/contact">
            Contact
          </Link>
        </li>
        {authData ? (
          <li className="nav-item">
            <button className="btn btn-danger nav-link" onClick={handleLogoutClick}>
              <span className='text-white'>Logout</span>
            </button>
          </li>
        ) : (
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  </div>

  {/* Custom Modal for Logout Confirmation */}
  <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Logout</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Are you sure you want to log out?
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModal}>No</Button>
      <Button variant="danger" onClick={handleLogoutConfirm}>Yes</Button>
    </Modal.Footer>
  </Modal>
</nav>

  );
};

export default Navbar;
