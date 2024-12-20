
import { useLocation, useNavigate } from 'react-router-dom';

function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const wrongAnswers = location.state?.wrongAnswers || [];

  // Navigate to Home page
  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="container">
    <div className='justify-content-center align-items-center d-flex mt-5 mb-5'>
      <div className='shadow-lg p-4 col-lg-8 col-md-10 col-12'>
      <h4 className="text-danger mb-4 text-center">Wrong Answers:</h4>
 {/* Display message if no wrong answers */}
 {wrongAnswers.length === 0 ? (
        <p>No wrong answers!</p>
      ) : (
        <ul className="list-unstyled">
          {wrongAnswers.map((wrongAnswer, index) => (
            <li key={index} className="mb-4">
              <p><strong>Question:</strong> {wrongAnswer.questionText}</p>
              
              {/* Styling Your Answer with red text */}
              <p className="text-danger">
                <strong>Incorrect:</strong> {wrongAnswer.selectedAnswer}
              </p>
              
              {/* Styling Correct Answer with green text */}
              <p className="text-success">
                <strong>Correct:</strong> {wrongAnswer.correctAnswer}
              </p>
            </li>
          ))}
        </ul>
      )}
      <div className='justify-content-center align-items-center d-flex'>
 {/* Go to Home button */}
 <button
        className="btn btn-primary mt-4"
        onClick={goHome}
      >
        Go to Home
      </button>
      </div>
    </div>
      </div>
    </div>
  );
}
export default Details;
