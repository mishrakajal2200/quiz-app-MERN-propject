
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session'); // Import express-session
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON and form data
app.use(express.json());
app.use(bodyParser.json()); // Body parser middleware

// Enable CORS (Cross-Origin Resource Sharing)
// app.use(cors({
//   origin: 'https://quiz-application-orpin-mu.vercel.app', // Update with your frontend URL
//   credentials: true // Enable credentials (cookies, authorization headers)
// }));

const corsOptions = {
  origin: ['https://your-frontend-vercel-url.vercel.app', 'http://localhost:3000'], // Replace with your Vercel domain
  methods: ['POST','GET','PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key', // Use a secure secret in production
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: false,  // Set to true in production with HTTPS
    sameSite: 'None' // Set to 'Lax' or 'Strict' if you don’t need cross-site cookies
  },
}));

// Import routes
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedbackRoutes');
// const questionRoutes = require('./routes/questionRoutes');
const quizRoutes = require('./routes/quizRoutes');
const reportCheating = require('./routes/reportCheating')
// Use routes
app.use('/api', authRoutes);           // For authentication routes
app.use('/api/quiz',quizRoutes)
app.use('/api',feedbackRoutes)
app.use('/api',reportCheating)

// app.use('/api/questions', questionRoutes);  // For question routes


// Default route to check if API is running
app.get('/', (req, res) => {
  res.send('Quiz API is running!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
