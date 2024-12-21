


const express = require('express');
const { submitQuiz, sendSMS } = require('../controllers/quizController');
const authentication = require('../middlewares/authMiddleware');
const router = express.Router();
// POST route to submit quiz data
router.post('/submit-quiz', authentication, submitQuiz);

// Route to send WhatsApp message
router.post('/send-sms', authentication, sendSMS);




module.exports = router;
