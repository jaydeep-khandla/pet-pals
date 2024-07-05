require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
// const verifyToken = require('./src/middlewares/auth');

const app = express(); // Create an Express application

connectDB(); // Connect to the database

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(authRoutes); // Apply the userRoutes to the /api/users path
// app.use(verifyToken); // Apply the auth middleware to all routes

const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});