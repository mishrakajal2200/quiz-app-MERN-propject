const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({

  questionText: String,
  options: [String],  // Array of options (e.g., multiple choice options)
  correctAnswer: String,  // Correct answer for the question
  lesson: { 
    type: String, 
    enum: ['Metals and Non-Metals', 'Magnetic Effects of Electric Current', 'How Do Organisms Reproduce', 'Heredity'],
    required: true 
  },
});

module.exports = mongoose.model('Quiz', quizSchema);