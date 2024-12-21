
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensuring username is unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensuring email is unique
  },
  password: {
    type: String,
    required: true,
  },
  cheatingAttempts: {
    type: Number,
    default: 0, // Default value is 0, meaning no cheating attempts yet
  },
  // You can add other fields as needed for your app
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // More fields (like role, lastLogin, etc.) can be added based on your app requirements
});

// Create a method to increment the cheating attempts (if needed)
userSchema.methods.incrementCheatingAttempts = function () {
  this.cheatingAttempts += 1;
  return this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
