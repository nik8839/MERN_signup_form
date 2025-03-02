const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Create a new user
router.post("/register", async (req, res) => {
  try {
   // console.log("API Hit: /register", req.body); // ✅ Debugging

    const { name, email, gender, password } = req.body;

    if (!name || !email || !gender || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Create and save new user
    const newUser = new User({ name, email, gender, password });
    console.log("New User:", newUser); // ✅ Debugging

    await newUser.save();
    console.log("User Saved Successfully!"); // ✅ Debugging

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
