
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modals/User');
const router = express.Router();
const Question = require('../modals/QuestionModel');
// const { getQuestions, addQuestion } = require("../controllers/questionController");

// Register route
router.post('/signup', async (req, res) => {
  const { username,fullName, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the user to the database
    const newUser = new User({ username,fullName, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, username: newUser.username });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register route



// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request:', req.body);
  try {
   
    const user = await User.findOne({ email });
console.log(user);  // Log the retrieved user from the database
if (!user) {
  return res.status(404).json({ message: 'User not found ! Please create your account' });
}


    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, username: user.username });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Login route


// // Get all questions
// router.get("/", getQuestions);
// // Add a question
// router.post("/", addQuestion);

// Sample logout route for session management
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Replace with your session cookie name
    return res.status(200).json({ message: 'Logged out successfully' });
  });
});

router.post('/questions', async (req, res) => {
  console.log('Request received at /questions');
  console.log(req.body);
  const { lessons } = req.body;

  if (!lessons || lessons.length === 0) {
    return res.status(400).json({ error: 'No lessons provided' });
  }

  try {
    // Find questions that match the selected lessons
    const questions = await Question.find({lesson: { $in: lessons.map((lesson) => new RegExp(`^${lesson}$`, 'i')) }},);
    console.log('Fetched questions:', questions);
    if (questions.length === 0) {
      return res.status(404).json({ error: 'No questions found for the selected lessons' });
    }

    res.json(questions); // Send the fetched questions to the frontend
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ error: 'Failed to load questions. Please try again.' });
  }
});

module.exports = router;
