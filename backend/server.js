require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Database Connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch((err) => console.error("Error connecting to PostgreSQL:", err));

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

// Task Routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Task Manager API is running...");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

