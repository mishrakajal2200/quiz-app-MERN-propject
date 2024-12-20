// const express = require('express');
// const router = express.Router();
// const Question = require('../modals/QuestionModel'); // Import the model

// Route to add a new question
// router.post('/add', async (req, res) => {
//   try {
//     const { questionText, options, correctAnswer, lesson } = req.body;

//     const newQuestion = new Question({
//       questionText,
//       options,
//       correctAnswer,
//       lesson,
//     });

//     await newQuestion.save();
//     res.status(201).json({ message: 'Question added successfully!', question: newQuestion });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add question', details: error.message });
//   }
// });

// Route to get all questions
// router.get('/', async (req, res) => {
//   try {
//     const questions = await Question.find();
//     res.status(200).json(questions);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch questions', details: error.message });
//   }
// });

// Route to get questions by lesson
// router.get('/lesson/:lesson', async (req, res) => {
//   try {
//     const { lesson } = req.params;
//     const questions = await Question.find({ lesson });
//     res.status(200).json(questions);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch questions by lesson', details: error.message });
//   }
// });

// Route to update a question
// router.put('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = req.body;

//     const updatedQuestion = await Question.findByIdAndUpdate(id, updatedData, { new: true });

//     if (!updatedQuestion) {
//       return res.status(404).json({ error: 'Question not found' });
//     }

//     res.status(200).json({ message: 'Question updated successfully', question: updatedQuestion });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update question', details: error.message });
//   }
// });

// Route to delete a question
// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedQuestion = await Question.findByIdAndDelete(id);

//     if (!deletedQuestion) {
//       return res.status(404).json({ error: 'Question not found' });
//     }

//     res.status(200).json({ message: 'Question deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete question', details: error.message });
//   }
// });

// module.exports = router;
