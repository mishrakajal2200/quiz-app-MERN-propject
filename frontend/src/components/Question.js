
import React from "react";

const Question = ({ question, options, correctAnswer, handleAnswerChange, selectedAnswer, quizCompleted }) => {
  const getButtonClass = (option) => {
    if (quizCompleted) {
      // If the user selected this option and it is correct, style it green
      if (option === correctAnswer) {
        return "btn btn-success w-100"; // Correct answer
      }
      // If the user selected this option and it is incorrect, style it red
      else if (option === selectedAnswer) {
        return "btn btn-danger w-100"; // Incorrect answer
      }
    }
    return "btn btn-outline-primary w-100"; // Default button style
  };

  return (
    <div className="question-container">
      {/* Question Box */}
      <div className="question-box border rounded p-4 mb-4 text-center bg-light">
        <h2 className="px-4">{question}</h2>
      </div>

      {/* Options */}
      <div className="row">
        {options.map((option, index) => (
          <div key={index} className="col-12 col-sm-6 mb-3">
            <button
              className={getButtonClass(option)}
              onClick={() => handleAnswerChange(option)}
              disabled={quizCompleted} // Disable buttons once quiz is completed
            >
              {option}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
