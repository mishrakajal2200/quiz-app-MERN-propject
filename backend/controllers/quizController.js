
// const sendWhatsAppMessage = require('../utils/twilio');
// const QuizSubmission = require('../modals/QuizSubmission');

// exports.submitQuiz = async (req, res) => {
//   try {
//     const { username, totalQuestions, attemptedQuestions, notAttempted, score, timeTaken, cheatingAttempts, wrongAnswers } = req.body;

//     const newSubmission = new QuizSubmission({
//       username,
//       totalQuestions,
//       attemptedQuestions,
//       notAttempted,
//       score,
//       timeTaken,
//       cheatingAttempts,
//       wrongAnswers
//     });

//     await newSubmission.save();
//     res.status(201).json({
//       message: 'Quiz submission saved successfully',
//       data: newSubmission
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

// exports.sendSMS = async (req, res) => {
//   try {
//     const { message, phoneNumber } = req.body;

//     // Call the Twilio utility function
//     await sendWhatsAppMessage(message, phoneNumber )

//     res.status(200).json({ success: true, message: 'WhatsApp message sent successfully!' });
//   } catch (error) {
//     console.error('Error sending WhatsApp message:', error);
//     res.status(500).json({ success: false, message: 'Failed to send WhatsApp message.' });
//   }
// };


const sendWhatsAppMessage = require('../utils/twilio');
const QuizSubmission = require('../modals/QuizSubmission');



// exports.submitQuiz = async (req, res) => {
//   try {
//     const {
//       username,
//       totalQuestions,
//       attemptedQuestions,
//       notAttempted,
//       score = 0, // Default value for testing
//       timeTaken,
//       cheatingAttempts,
//       wrongAnswers,
//     } = req.body;

//     const newSubmission = new QuizSubmission({
//       username,
//       totalQuestions,
//       attemptedQuestions,
//       notAttempted,
//       score,
//       timeTaken,
//       cheatingAttempts,
//       wrongAnswers,
//     });

//     await newSubmission.save();
//     res.status(201).json(newSubmission);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.submitQuiz = async (req, res) => {
//   try {
//     const {
//       username,
//       totalQuestions,
//       attemptedQuestions,
//       notAttempted,
//       score,
//       timeTaken,
//       cheatingAttempts,
//       wrongAnswers,
//     } = req.body;

//     // Validate required fields
//     if (!username || totalQuestions === undefined || attemptedQuestions === undefined) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const newSubmission = new QuizSubmission({
//       username,
//       totalQuestions,
//       attemptedQuestions,
//       notAttempted,
//       score: score || 0, // Default score to 0 if not provided
//       timeTaken,
//       cheatingAttempts,
//       wrongAnswers,
//     });

//     await newSubmission.save();
//     res.status(201).json({ message: "Quiz submission successful", data: newSubmission });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };

exports.submitQuiz = async (req, res) => {
  try {
    const {
      username,
      totalQuestions,
      attemptedQuestions,
      notAttempted,
      score,
      timeTaken,
      cheatingAttempts,
      correctAnswers,
      wrongAnswers,
    } = req.body;

    console.log(req.body); // Log incoming data to debug

    // Validate required fields
    if (!username || totalQuestions === undefined || attemptedQuestions === undefined || timeTaken === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newSubmission = new QuizSubmission({
      username,
      totalQuestions,
      attemptedQuestions,
      notAttempted,
      score: score || 0,
      timeTaken,
      cheatingAttempts: cheatingAttempts || 0,
      correctAnswers: correctAnswers || 0,
      wrongAnswers: wrongAnswers || [],
    });

    await newSubmission.save();

    res.status(201).json({ message: "Quiz submission successful", data: newSubmission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};




exports.sendSMS = async (req, res) => {
  try {
    const { message,phoneNumber} = req.body;

    // Call the Twilio utility function to send the message
    await sendWhatsAppMessage(message,phoneNumber);

    res.status(200).json({ success: true, message: 'WhatsApp message sent successfully!' });
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    res.status(500).json({ success: false, message: 'Failed to send WhatsApp message.' });
  }
};


