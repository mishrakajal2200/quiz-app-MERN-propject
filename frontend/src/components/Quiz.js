
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import {Modal,Button} from 'react-bootstrap';

// Helper function to shuffle questions
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Quiz = ({userId, testId}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedLessons } = location.state || {}; // Add fallback for undefined state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [showWrongAnswers, setShowWrongAnswers] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cheatingAttempts, setCheatingAttempts] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setCheatingAttempts((prev) => prev + 1);
        setShowWarning(true);
        reportCheating();
        setTimeout(() => setShowWarning(false), 3000);
      }
    };
  
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []); // Add empty dependency array to ensure this runs only once
  
  const reportCheating = async () => {
    try {
      const response = await fetch("/api/report-cheating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "user123", // Replace with actual user ID
          attempts: cheatingAttempts + 1, // Assuming 'cheatingAttempts' is a state variable
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Cheating attempt reported:", data);
      } else {
        console.log("Error reporting cheating:", response.status);
      }
    } catch (error) {
      console.error("Failed to report cheating:", error);
    }
  };
  

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        if (!selectedLessons || selectedLessons.length === 0) {
          setError("No lessons selected!");
          return;
        }

        // Request the questions for the selected lessons
        const response = await axios.post("http://localhost:5000/api/questions", {
          lessons: selectedLessons,
        });

        if (response.status === 200 && Array.isArray(response.data)) {
          const lessonQuestions = response.data;

          // Distribute questions based on selected lessons
          let distributedQuestions = [];

          // Calculate how many questions to get from each lesson
          const numLessons = selectedLessons.length;
          let questionsPerLesson = [];

          // Updated distribution logic based on selected lessons
          if (numLessons === 1) {
            questionsPerLesson = [25];
          } else if (numLessons === 2) {
            questionsPerLesson = [12, 13];
          } else if (numLessons === 3) {
            questionsPerLesson = [8, 8, 9];
          } else if (numLessons === 4) {
            questionsPerLesson = [6, 6, 6, 7];
          }

          selectedLessons.forEach((lesson, index) => {
            const lessonQuestionsForThisLesson = lessonQuestions.filter(
              (question) => question.lesson === lesson
            );
            const selectedQuestions = shuffleArray(lessonQuestionsForThisLesson).slice(0, questionsPerLesson[index]);
            distributedQuestions = [...distributedQuestions, ...selectedQuestions];
          });

          setQuestions(distributedQuestions);
          setStartTime(Date.now());
        } else {
          setError("No questions available for the selected lessons.");
        }
      } catch (err) {
        setError("Failed to load questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [selectedLessons]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (!quizCompleted && startTime) {
        setTimer(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [startTime, quizCompleted]);

  const handleAnswerChange = (answer) => {
    setSelectedAnswer(answer);
    console.log("Selected Answer: ", answer);
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      // Show the modal if no answer is selected
      setShowModal(true);
    } else {
      saveAnswerAndProceed();
    }
  };

  
  const saveAnswerAndProceed = () => {
    setUserAnswers([
      ...userAnswers,
      { questionId: currentQuestion._id, answer: selectedAnswer || "Not Attempted" },
    ]);
    setSelectedAnswer(null);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setShowModal(false); // Close the modal if it was open
  };

  const handleModalConfirm = () => {
    saveAnswerAndProceed();
  };

  const handleModalCancel = () => {
    setShowModal(false); // Close the modal and stay on the same question
  };


  const handlePrevious = () => {
    const prevIndex = currentQuestionIndex - 1;
    setCurrentQuestionIndex(prevIndex);
    setSelectedAnswer(userAnswers[prevIndex]?.answer || null);
  };



// const handleSubmit = async () => {
//   setEndTime(Date.now());
//   setQuizCompleted(true);
//   calculateScore(); // Get the values returned from calculateScore

//   const totalTime = Math.floor((Date.now() - startTime) / 1000); // Time in seconds
//   const totalQuestions = questions.length;

//   // Populate wrongAnswers correctly by filtering out wrong answers
//   const wrongAnswers = userAnswers
//     .filter(answer => {
//       const question = questions.find(q => q._id === answer.questionId);
//       return answer.answer !== question.correctAnswer; // Check if the answer is wrong
//     })
//     .map(answer => {
//       const question = questions.find(q => q._id === answer.questionId);
//       return {
//         questionText: question.questionText,
//         selectedAnswer: answer.answer,
//         correctAnswer: question.correctAnswer,
//       };
//     });

//   const notAttempted = userAnswers.filter(answer => answer.answer === "Not Attempted").length;
//   const attemptedQuestions = totalQuestions - notAttempted;
//   const token = localStorage.getItem('token');
//   const username = localStorage.getItem("username");

//   const quizResult = {
//     username: username,
//     totalQuestions: totalQuestions,
//     attemptedQuestions: attemptedQuestions,
//     correctAnswers: score,  // Ensure score is defined correctly
//     wrongAnswers: wrongAnswers,  // Populate wrongAnswers here
//     notAttempted: notAttempted,
//     timeTaken: totalTime,
//     cheatingAttempts: cheatingAttempts, // Ensure cheatingAttempts is properly defined
//   };

//   console.log('Result for UI:', quizResult);
//   console.log('WhatsApp Data:', quizResult);

//   const message = `
//     Quiz Result for ${username}:
//     Total Questions: ${totalQuestions}
//     Correct Answers: ${score}
//     Time Taken: ${totalTime}s
//     Attempted: ${attemptedQuestions}
//     Cheating Attempts: ${cheatingAttempts}
//     Wrong Answers: ${wrongAnswers.length}
//   `;

//   try {
//     const response = await fetch('http://localhost:5000/api/quiz/submit-quiz', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(quizResult),
//     });

//     const result = await response.json();
//     if (response.ok) {
//       console.log('Quiz result saved:', result);
//       // Trigger SMS sending logic
//       await fetch('http://localhost:5000/api/quiz/send-sms', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           message: message,
//           phoneNumber: `whatsapp:+919321754089`,
//         }),
//       });
//     } else {
//       console.log('Error saving quiz result:', result);
//     }
//   } catch (error) {
//     console.error('Error submitting quiz:', error);
//   }
// };


// const calculateScore = () => {
//   const correctAnswers = userAnswers.reduce((acc, { questionId, answer }) => {
//     const question = questions.find((q) => q._id === questionId); // Use _id here
//     if (answer === question.correctAnswer) {
//       return acc + 1;
//     } else {
//       setWrongAnswers((prev) => [
//         ...prev,
//         { questionText: question.questionText, selectedAnswer: answer, correctAnswer: question.correctAnswer },
//       ]);
//       return acc;
//     }
//   }, 0);
//   setScore(correctAnswers);
// };

// const calculateScore = () => {
//   const wrongAnswers = [];

//   // Calculate the score
//   const correctAnswers = userAnswers.reduce((acc, { questionId, answer }) => {
//     // Find the question corresponding to the answer
//     const question = questions.find((q) => q._id === questionId); // Use _id to match the question
    
//     console.log(`Checking answer for questionId: ${questionId}`);
//     console.log(`Selected answer: ${answer}, Correct answer: ${question.correctAnswer}`);
    
//     if (question) {
//       // Compare the selected answer with the correct answer
//       if (answer === question.correctAnswer) {
//         console.log("Correct answer!");
//         return acc + 1; // Increment score for correct answer
//       } else {
//         console.log("Wrong answer!");
//         // If answer is incorrect, add to wrong answers array
//         wrongAnswers.push({
//           questionText: question.questionText,
//           selectedAnswer: answer,
//           correctAnswer: question.correctAnswer,
//         });
//         return acc; // Don't increment score for wrong answer
//       }
//     }

//     return acc; // Return accumulated score
//   }, 0);

//   // Log the final score and wrong answers
//   console.log('Final Score:', correctAnswers);
//   console.log('Wrong Answers:', wrongAnswers);

//   // Update state with the score and wrong answers
//   setScore(correctAnswers);  // Set the calculated score
//   setWrongAnswers(wrongAnswers); // Set the wrong answers
// };


const handleSubmit = async () => {
  setEndTime(Date.now());
  setQuizCompleted(true);

  // Get the calculated score and wrong answers
  const { score, wrongAnswers } = calculateScore();

  const totalTime = Math.floor((Date.now() - startTime) / 1000); // Time in seconds
  const totalQuestions = questions.length;

  // Count not attempted questions
  const notAttempted = userAnswers.filter(answer => answer.answer === "Not Attempted").length;
  const attemptedQuestions = totalQuestions - notAttempted;

  const token = localStorage.getItem('token');
  const username = localStorage.getItem("username");

  const quizResult = {
    username: username,
    totalQuestions: totalQuestions,
    attemptedQuestions: attemptedQuestions,
    correctAnswers: score,  // Send the correct score
    wrongAnswers: wrongAnswers,  // Send wrong answers
    notAttempted: notAttempted,
    timeTaken: totalTime,
    cheatingAttempts: cheatingAttempts, // Ensure this is defined and used properly
  };

  console.log('Result for UI:', quizResult); // Log the result to confirm it's correct
  console.log('Sending result to backend:', quizResult); // Log to verify data

  try {
    const response = await fetch('http://localhost:5000/api/quiz/submit-quiz', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quizResult), // Sending quiz result
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Quiz result saved:', result);

      // Trigger SMS sending logic if needed
      await fetch('http://localhost:5000/api/quiz/send-sms', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Quiz Result for ${username}:\n` +
               `Total Questions: ${totalQuestions}\n` +
               `Attempted Questions: ${attemptedQuestions}\n` +
               `Correct Answers: ${score}\n` +
               `Wrong Answers: ${wrongAnswers.length}\n` +  // Show count of wrong answers
               `Time Taken: ${totalTime} seconds\n` +
               `Not Attempted: ${notAttempted}\n` +
               `Cheating Attempts: ${cheatingAttempts}\n`,
          phoneNumber: `whatsapp:+918866224439`,
        }),
      });
    } else {
      console.log('Error saving quiz result:', result);
    }
  } catch (error) {
    console.error('Error submitting quiz:', error);
  }
};




const calculateScore = () => {
  const wrongAnswers = [];

  // Calculate the score
  const correctAnswers = userAnswers.reduce((acc, { questionId, answer }) => {
    const question = questions.find((q) => q._id === questionId);
    
    if (question) {
      if (answer === question.correctAnswer) {
        return acc + 1; // Increment score for correct answer
      } else {
        wrongAnswers.push({
          questionText: question.questionText,
          selectedAnswer: answer,
          correctAnswer: question.correctAnswer,
        });
      }
    }
    return acc;
  }, 0);

  // Set state for score and wrong answers
  setScore(correctAnswers); 
  setWrongAnswers(wrongAnswers);

  // Log final score and wrong answers for debugging
  console.log('Final Score:', correctAnswers);
  console.log('Wrong Answers:', wrongAnswers);
  
  return { score: correctAnswers, wrongAnswers }; // Return values
};


const handleShowDetails = () => {
  // Navigate to the details page and pass the wrong answers state
  navigate('/details', { state: { wrongAnswers } });
  setShowWrongAnswers(!showWrongAnswers);
};

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  
// Styles for the warning message
const warningStyles = {
  position: "absolute",   // Position it absolutely in the viewport
  top: "10%",             // Center vertically
  left: "50%",            // Center horizontally
  transform: "translate(-50%, -50%)",  // Adjust for exact center
  backgroundColor: "#ffcc00",
  color: "#000",
  padding: "10px 20px",
  borderRadius: "5px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  fontWeight: "bold",
  zIndex: 1000,
};




if (quizCompleted) {
    const totalTime = Math.floor((endTime - startTime) / 1000); // Time in seconds
    const totalQuestions = 25;
    // Calculate Not Attempted questions (where the user has not selected an answer)
    const notAttempted = userAnswers.filter(answer => answer.answer === "Not Attempted").length;
   // Calculate Attempted questions (Total - Not Attempted)
   const attemptedQuestions = totalQuestions - notAttempted;
   const username = localStorage.getItem('username');
   
    return (
      <div className="container mt-5 col-lg-6 resultPage">
        <div className="card shadow p-4">
          <div className="card-body text-center">
            <h4 className="text-success">Quiz Completed!</h4>
            <p className="lead">Congratulations <span className="text-primary text-bold">{username}</span> on completing the quiz.</p>

            {/* Display Total Questions, Correct Answers, and Time Taken */}
            <div className="mb-3">
              <p>Name:{username}</p>
              <p>Total Questions: {questions.length}</p>
              <p>Correct Answers: {score}</p>
              <p>Time Taken: {totalTime}s</p>
              <p>Attempted:{attemptedQuestions}</p>
              <p className="d-none">Not Attempted: {notAttempted}</p> 
              <p>Cheating Attempts: {cheatingAttempts}</p>
              <p >Wrong Answers: {wrongAnswers.length}</p><button
  className="btn btn-info mb-3"
  onClick={handleShowDetails}
>
  Show Details
</button>
            </div>
            {/* Display a Progress Bar */}
            <div className="progress mb-4" style={{ height: '20px' }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${(score / questions.length) * 100}%` }}
                aria-valuenow={score}
                aria-valuemin="0"
                aria-valuemax={questions.length}
              ></div>
            </div>

            {/* Show the Score */}
            <h5 className="text-primary mb-4">
              You scored {score} out of {questions.length}
            </h5>

            {/* Wrong Answers Section */}
            <div className="mb-4">
             
              {showWrongAnswers && (
          <div>
            <h5 className="text-danger">Wrong Answers:</h5>
            <ul className="list-unstyled">
              {wrongAnswers.map((wrongAnswer, index) => (
                <li key={index}>
                  <p><strong>Question:</strong> {wrongAnswer.questionText}</p>
                  {/* <p><strong>Your Answer:</strong> {wrongAnswer.selectedAnswer}</p> */}
                  <strong>Your Answer:</strong>{" "}
                  {userAnswers[index] !== null && userAnswers[index] !== undefined
          ? userAnswers[index]
          : "Not Attempted"}
                  <p><strong>Correct Answer:</strong> {wrongAnswer.correctAnswer}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
            </div>

            

            {/* Buttons for Restarting or Going Back */}
            <button
              className="btn btn-success mx-2"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
            <button
              className="btn btn-secondary mx-2"
              onClick={() => window.location.href = '/'}
            >
              Go to Home
            </button>
            {/* Submit to Teacher Button */}
          </div>
        </div>
      </div>
    );
}

  const currentQuestion = questions[currentQuestionIndex] || {};

  return (
    <div className="container mt-3">
      <ToastContainer />
      <div className="row justify-content-center">
        {/* Right Column: Quiz Content */}
        <div className="col-12 col-md-6">
  <div className="card shadow p-4">
    <div className="card-body">
      {/* Timer and Question Number */}
      <div className="d-flex justify-content-between align-items-center">
        <span className="timer">Time: {timer}s</span>
        <span className="question-number">{currentQuestionIndex + 1} / 25</span>
      </div>
      <hr />

      {/* Question Text */}
      <div className="question-text mb-4 bg-light p-4 border-4 border ">
        <h5><span className="text-danger">Q.{currentQuestionIndex + 1} </span>
          {currentQuestion?.questionText || "Loading question..."}</h5>
      </div>

      <div className="row mt-4">
        {currentQuestion?.options?.map((option, index) => (
          <div
            className="col-12 col-md-6 mb-2" // 12 columns on small screens, 6 columns on medium and large screens
            key={index}
          >
            <button
              className={`btn btn-outline-primary w-100 h-100 ${selectedAnswer === option ? "active" : ""}`}
              onClick={() => handleAnswerChange(option)}
            >
              {option}
            </button>
          </div>
        ))}
      </div>

      {/* Display warning message inside the card body */}
      {showWarning && (
        <p style={warningStyles}>
          ⚠️ You have switched tabs! This will be reported.
        </p>
      )}

      {/* Navigation Buttons */}
      <div className="mt-4 d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        {currentQuestionIndex < questions.length - 1 ? (
          <button className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleSubmit}>
            Submit
          </button>
        )}

        {/* Modal */}
        <Modal show={showModal} onHide={handleModalCancel}>
          <Modal.Header closeButton>
            <Modal.Title className="text-danger">Confirm Question Switch</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-black">
            You haven't selected an answer. Do you want to switch to the next question?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalCancel}>
              No
            </Button>
            <Button variant="primary" onClick={handleModalConfirm}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default Quiz;
