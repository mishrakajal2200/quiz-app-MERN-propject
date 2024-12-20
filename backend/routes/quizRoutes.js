


const express = require('express');
const { submitQuiz, sendSMS } = require('../controllers/quizController');
const authentication = require('../middlewares/authMiddleware');
const router = express.Router();
// const TestAttempt = require('../modals/testAttempts');
// POST route to submit quiz data
router.post('/submit-quiz', authentication, submitQuiz);

// Route to send WhatsApp message
router.post('/send-sms', authentication, sendSMS);

// Increment Attempt Count
// router.post('/increment-attempt', async (req, res) => {
//   const { userId, testId } = req.body;

//   try {
//     let attempt = await TestAttempt.findOne({ userId, testId });
    
//     if (attempt) {
//       attempt.attemptCount += 1;
//     } else {
//       attempt = new TestAttempt({ userId, testId, attemptCount: 1 });
//     }

//     await attempt.save();
//     res.status(200).json({ message: 'Attempt recorded', attemptCount: attempt.attemptCount });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to record attempt' });
//   }
// });


module.exports = router;
