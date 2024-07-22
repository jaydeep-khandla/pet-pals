require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const routes = require("./src/routes");
const cors = require("cors");

const app = express(); // Create an Express application

connectDB(); // Connect to the database
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/", routes); // Apply the userRoutes to the /api/auth path

const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
