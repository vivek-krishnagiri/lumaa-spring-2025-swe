const { Pool } = require("pg");

// Database Connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Create a Task
const createTask = async (title, description, userId) => {
    const result = await pool.query(
        "INSERT INTO tasks (title, description, userId) VALUES ($1, $2, $3) RETURNING *",
        [title, description, userId]
    );
    return result.rows[0];
};

// Get All Tasks for a User
const getTasksByUser = async (userId) => {
    const result = await pool.query(
        "SELECT * FROM tasks WHERE userId = $1",
        [userId]
    );
    return result.rows;
};

// Update Task
const updateTask = async (taskId, title, description, isComplete, userId) => {
    const result = await pool.query(
        "UPDATE tasks SET title = $1, description = $2, isComplete = $3 WHERE id = $4 AND userId = $5 RETURNING *",
        [title, description, isComplete, taskId, userId]
    );
    return result.rows[0];
};

// Delete Task
const deleteTask = async (taskId, userId) => {
    const result = await pool.query(
        "DELETE FROM tasks WHERE id = $1 AND userId = $2 RETURNING *",
        [taskId, userId]
    );
    return result.rows[0];
};

module.exports = { createTask, getTasksByUser, updateTask, deleteTask };

