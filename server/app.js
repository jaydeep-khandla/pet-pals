require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
// const userRoutes = require('./src/routes/userRoutes');
// const auth = require('./src/middlewares/auth');

const app = express(); // Create an Express application

app.use(express.json()); // Middleware to parse JSON request bodies
// app.use(auth); // Apply the auth middleware to all routes
// app.use('/api/users', userRoutes); // Apply the userRoutes to the /api/users path

connectDB(); // Connect to the database

const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});