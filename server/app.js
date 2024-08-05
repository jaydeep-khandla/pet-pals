require('dotenv').config();
const cors = require('cors');
const express = require('express'); 
const cookieParser = require("cookie-parser");
const credentials = require('./src/middlewares/credentials');
const corsOptions = require('./src/config/corsOptions');
const connectDB = require('./src/config/db');
const routes = require('./src/routes');

const app = express(); // Create an Express application

connectDB(); // Connect to the database
app.use(credentials);
app.use(cors(corsOptions));  // Enable CORS
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/", routes); // Apply the userRoutes to the /api/auth path

const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
