
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './home.css';

const Home = ({ authData }) => {
  const navigate = useNavigate();
  const [selectedLessons, setSelectedLessons] = useState([]);

  // Lesson data with the number of questions in each
  const lessonQuestions = {
    'Metals and Non-Metals': 32,
    'Magnetic Effects of Electric Current': 18,
    'How Do Organisms Reproduce': 26,
    'Heredity': 13
  };

  // Function to calculate how many questions per lesson to assign
  const calculateQuestionsPerLesson = () => {
    const totalQuestions = 25; // Fixed total questions
    const numLessons = selectedLessons.length;
    const questionsPerLesson = {};

    if (numLessons === 0) return questionsPerLesson;

    // First, distribute the questions equally
    let baseQuestions = Math.floor(totalQuestions / numLessons);
    let remainingQuestions = totalQuestions - baseQuestions * numLessons;

    // Assign the base number of questions to each selected lesson
    selectedLessons.forEach(lesson => {
      questionsPerLesson[lesson] = baseQuestions;
    });

    // Distribute the remaining questions
    let i = 0;
    while (remainingQuestions > 0) {
      const lesson = selectedLessons[i];
      questionsPerLesson[lesson] += 1;
      remainingQuestions -= 1;
      i = (i + 1) % numLessons;
    }

    return questionsPerLesson;
  };

  useEffect(() => {
    const firstVisit = localStorage.getItem('firstVisit');
    if (!firstVisit) {
      localStorage.setItem('firstVisit', 'true');
      toast.info('Please login first to access the quiz!', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  }, []);

  // Function to handle lesson selection
  const handleCategoryClick = (lesson) => {
    setSelectedLessons((prevSelected) => {
      const newSelected = prevSelected.includes(lesson)
        ? prevSelected.filter((l) => l !== lesson) // Deselect if already selected
        : [...prevSelected, lesson]; // Add to selection
      
      // Log the questions distribution
      const questionsDistribution = calculateQuestionsPerLesson();
      console.log('Questions per lesson:', questionsDistribution);
      
      return newSelected;
    });
  };

  const handleStartQuiz = () => {
    if (!authData) {
      toast.warning('Please login first to access the quiz!', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }
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
    <div className="home-page d-flex justify-content-center align-items-center vh-100">
      <div className="container col-lg-6 col-sm-6 col-md-8 col-11 bg-light shadow-lg p-5 rounded">
        <h1 className="text-center text-success mt-3">
          Welcome to QuizMaster
          <span className="text-info">{authData ? ` ${authData.username}!` : ''}</span>
        </h1>
        <div className="justify-content-center align-items-center d-flex">
          <img
            src="https://th.bing.com/th/id/R.6ff006bcc0c6ac3c73bab3ac512b89b5?rik=Ytmkv3dWS8UhFA&pid=ImgRaw&r=0"
            alt="logo"
            className="img-fluid col-lg-3 col-4 rounded-circle shadow-lg"
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
            'Heredity'
          ].map((lesson, index) => (
            <div className="col-md-6 mb-3" key={index}>
              <label
                className={`btn w-100 d-flex align-items-center justify-content-center ${
                  selectedLessons.includes(lesson) ? 'btn-danger text-white' : 'btn-outline-primary'
                }`}
              >
                <input
                  type="checkbox"
                  value={lesson}
                  checked={selectedLessons.includes(lesson)}
                  onChange={() => handleCategoryClick(lesson)} // Trigger handleCategoryClick
                  className="visually-hidden" // Hide the checkbox visually
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
