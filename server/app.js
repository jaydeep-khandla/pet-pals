require('dotenv').config();
require('./src/config/bullmq_worker');
const express = require('express');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const verifyToken = require('./src/middlewares/verifyToken');

const app = express(); // Create an Express application

connectDB(); // Connect to the database

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(authRoutes); // Apply the userRoutes to the /api/users path
app.use(verifyToken); // Apply the auth middleware to all routes
app.use(adminRoutes); // Apply the adminRoutes to the /api/admin path

const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});