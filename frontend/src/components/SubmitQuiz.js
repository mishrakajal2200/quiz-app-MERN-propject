
import React, { useState } from 'react';
import axios from 'axios';

const SubmitQuiz = ({ studentId, quizId, answers }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await axios.post('/api/quizResults/submit', {
        studentId,
        quizId,
        answers
      });
      alert('Your quiz results have been submitted!');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('There was an error submitting your results.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Quiz'}
      </button>
    </div>
  );
};

export default SubmitQuiz;
