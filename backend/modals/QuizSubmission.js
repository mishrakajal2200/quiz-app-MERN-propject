


const mongoose = require('mongoose');

const QuizSubmissionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  totalQuestions: { type: Number, required: true },
  attemptedQuestions: { type: Number, required: true },
  notAttempted: { type: Number, required: true },
  score: { type: Number, default: 0 },
  timeTaken: { type: Number },
  cheatingAttempts: { type: Number, default: 0 },
  correctAnswers: { type: Number, default: 0 },
  wrongAnswers: [
    {
      questionText: String,
      selectedAnswer: String,
      correctAnswer: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('QuizSubmission', QuizSubmissionSchema);
