

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Missing or malformed token' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer'
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (error) {
    console.error('Token verification error:', error.message); // Log for debugging
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

module.exports = verifyToken;
