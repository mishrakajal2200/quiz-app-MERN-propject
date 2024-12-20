//  const Question = require("../modals/QuestionModel");

// // Get all questions
// const getQuestions = async (req, res) => {
//     try {
//         const questions = await Question.find();
//         res.json(questions);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// module.exports = { getQuestions };
const Question = require("../modals/QuestionModel");

// Get all questions
exports.getQuestions = async (req, res) => {
  try {
    const { category } = req.query; // Optional category filter
    const filter = category ? { category } : {};
    const questions = await Question.find(filter);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error });
  }
};

// Add a new question
exports.addQuestion = async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(400).json({ message: "Error adding question", error });
  }
};
