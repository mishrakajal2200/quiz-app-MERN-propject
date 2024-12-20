
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image from '../components/dev.jpg';

const Home = () => {
  const navigate = useNavigate();
  const [selectedLessons, setSelectedLessons] = useState([]);
  const [username, setUsername] = useState(''); // State to store the username

  
  // Lesson data with the number of questions in each
  const lessonQuestions = {
    'Metals and Non-Metals': 32,
    'Magnetic Effects of Electric Current': 18,
    'How Do Organisms Reproduce': 26,
    'Heredity': 13,
    'Chamical Reactions and Equations':27
  };

  // Calculate the total number of questions based on selected lessons
  const calculateTotalQuestions = () => {
    return selectedLessons.reduce(
      (total, lesson) => total + lessonQuestions[lesson],
      0
    );
  };
 
  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      // Prompt the user for their name if no username exists
      const enteredUsername = prompt('Please enter your name:');
      if (enteredUsername) {
        localStorage.setItem('username', enteredUsername);
        setUsername(enteredUsername);
      }
    }
  }, []);

  
  const handleCategoryClick = (lesson) => {
    setSelectedLessons((prevSelected) => {
      const newSelected = prevSelected.includes(lesson)
        ? prevSelected.filter((l) => l !== lesson) // Deselect if already selected
        : [...prevSelected, lesson]; // Add to selection
      return newSelected;
    });
  };

  const handleStartQuiz = () => {
    if (selectedLessons.length === 0) {
      toast.warning('Please select at least one lesson!', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }
    navigate('/quiz', { state: { selectedLessons } });
  };

  return (
    <div className="home-page d-flex justify-content-center align-items-center mt-4 mb-4">
      <div className="container col-lg-6 col-sm-6 col-md-8 col-11 bg-light shadow-lg p-4 rounded">
        <h1 className="text-center text-success mt-3">
          Welcome to QuizMaster{' '}
          <span className="text-info">{username ? ` ${username}!` : ''}</span>
        </h1>
        <div className="justify-content-center align-items-center d-flex">
          <img
            src={image}
            alt="logo"
            className="img-fluid rounded-circle shadow-lg object-fit-cover w-sm-25 w-md-25 "
            style={{ width: "150px", height: "150px" }}
          />
        </div>
        <p className="text-center mt-4">
          Select lessons for your quiz, and challenge yourself with questions from one or more lessons.
        </p>

        <div className="row mt-3">
          {[
            'Metals and Non-Metals',
            'Magnetic Effects of Electric Current',
            'How Do Organisms Reproduce',
            'Heredity',
            'Chamical Reactions and Equations',
          ].map((lesson, index) => (
            <div className="col-md-6 mb-3" key={index}>
              <label
                className={`btn w-100 h-100 d-flex align-items-center justify-content-center ${
                  selectedLessons.includes(lesson)
                    ? 'btn-danger text-white'
                    : 'btn-outline-primary'
                }`}
              >
                <input
                  type="checkbox"
                  value={lesson}
                  checked={selectedLessons.includes(lesson)}
                  onChange={() => handleCategoryClick(lesson)}
                  className="visually-hidden"
                />
                {lesson}
              </label>
            </div>
          ))}
        </div>

        <button className="btn btn-success w-100 mt-4" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;


