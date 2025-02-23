const { Pool } = require("pg");
const bcrypt = require("bcrypt");

// Database Connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Create User (Register)
const createUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
        [username, hashedPassword]
    );
    return result.rows[0];
};

// Find User by Username (Login)
const findUserByUsername = async (username) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    );
    return result.rows[0];
};

module.exports = { createUser, findUserByUsername };

