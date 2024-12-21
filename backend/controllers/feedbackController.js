
const Feedback = require('../modals/feedbackModel'); // Assuming you have a Feedback model

// Controller function to save feedback
const submitFeedback = async (name, email, message) => {
  try {
    const newFeedback = new Feedback({
      name,
      email,
      message,
    });

    await newFeedback.save(); // Save to database

    console.log('Feedback saved to the database!');
  } catch (error) {
    console.error('Error saving feedback:', error);
    throw new Error('Failed to save feedback');  // Propagate error for handling in the route
  }
};

module.exports = { submitFeedback };
