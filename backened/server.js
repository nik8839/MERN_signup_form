require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/UserRoutes'); // Import User Routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Enable JSON parsing
app.use(express.urlencoded({ extended: true })); // Parse JSON requests
app.use(
    cors({
      origin: "https://67c45934b7f41f3f053ae733--startling-sprinkles-aaf5ed.netlify.app/", 
      credentials: true,
    })
  ); // Enable CORS
 // Use User Routes

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("✅ MongoDB Connected!");
}).catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
});

app.use('/api/users', userRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
