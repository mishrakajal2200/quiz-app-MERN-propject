// routes/reportCheating.js
const express = require('express');
const User = require('../modals/User');
const router = express.Router();

router.post('/report-cheating', async (req, res) => {
  const { userId, attempts } = req.body;

  try {
    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Increment the cheatingAttempts field
    user.cheatingAttempts = attempts;  // Alternatively, use user.incrementCheatingAttempts() if using the method

    await user.save();  // Save the updated user data

    return res.status(200).json({
      message: "Cheating attempt reported successfully",
      cheatingAttempts: user.cheatingAttempts,  // Return the updated number of attempts
    });
  } catch (error) {
    console.error("Error reporting cheating:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
