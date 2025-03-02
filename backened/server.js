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

const allowedOrigins = [
  "https://startling-sprinkles-aaf5ed.netlify.app/", // ✅ Replace with your Netlify URL
   // ✅ Allow local development
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // ✅ Allow cookies & authentication headers
  methods: "GET,POST,PUT,DELETE", // ✅ Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // ✅ Allowed headers
})); // Enable CORS
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
