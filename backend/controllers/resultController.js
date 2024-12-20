const result = require('../modals/Result');

// Controller function to handle quiz submission
exports.submitQuiz = async (req, res) => {
  try {
    const { totalQuestions, correctAnswers, totalTime, score } = req.body;

    // Create a new QuizSubmission
    const newSubmission = new result({
      totalQuestions,
      correctAnswers,
      totalTime,
      score,
    });

    // Save to the database
    await newSubmission.save();

    // Respond with success
    res.status(201).json({
      message: 'Quiz submitted successfully!',
      submission: newSubmission,
    });
  } catch (error) {
    console.error('Error during quiz submission:', error);
    res.status(400).json({ message: 'Error submitting quiz.' });
  }
};
