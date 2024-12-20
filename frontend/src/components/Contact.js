
import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaPaperPlane } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token'); // Fetch the token from localStorage
   
    if (!token) {
      toast.error('Unauthorized: Please log in first.');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:5000/api/feedback-submit', // Backend URL
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        toast.success('Feedback submitted successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form data
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data.error || 'Unauthorized: Invalid token.');
      } else {
        toast.error('Failed to submit feedback.');
      }
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div className="contact-page d-flex justify-content-center align-items-center mt-3 bg-white">
      <ToastContainer position="top-right" />
      <div className="text-center col-lg-6 col-10 col-sm-10 col-md-10 col-10">
        <h1 className="text-danger">Get in Touch with Us</h1>
        <p className="text-black fs-4">
          We'd love to hear from you! Whether you have feedback, questions, or suggestions, feel free to reach out to us:
        </p>

        <div className="container my-4">
  <div className="row align-items-center justify-content-center">
    <div className="col-md-8 col-lg-10">
      <ul className="list-unstyled text-start bg-light p-4 rounded shadow-sm">
        <li className="mb-3">
          <h6 className="d-flex align-items-center">
            <FaEnvelope className="me-2 text-danger" />
            <span>Email: devsirtutorials@gmail.com</span>
          </h6>
        </li>
        <li className="mb-3">
          <h6 className="d-flex align-items-center">
            <FaPhone className="me-2 text-success" />
            <span>Phone: +18866224439 / 9594750338</span>
          </h6>
        </li>
        <li>
          <h6 className="d-flex align-items-start">
            <FaMapMarkerAlt className="me-2 text-primary" />
            <span>
              Address: Ganeshleela Soc. B wing Ground floor, opposite to
              Narepark ground Nana palkar Lane Parel Mumbai 400012
            </span>
          </h6>
        </li>
      </ul>
    </div>
  </div>
</div>

        <p className="fs-4">
          Or, simply fill out the form below, and we'll get back to you as soon as possible.
        </p>

        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-danger text-white">
              <FaUser />
            </span>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              required
              value={formData.name}
              onChange={handleChange}
               autoComplete="off"
            />
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white">
              <FaEnvelope />
            </span>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
               autoComplete="off"
            />
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-success text-white">
              <FaPaperPlane />
            </span>
            <textarea
              className="form-control"
              id="message"
              rows="4"
              placeholder="Type your message here"
              required
              value={formData.message}
              onChange={handleChange}
               autoComplete="off"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-danger">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
