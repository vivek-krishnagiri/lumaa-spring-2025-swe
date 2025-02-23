const express = require("express");
const { createTask, getTasksByUser, updateTask, deleteTask } = require("../models/taskModel");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new task
router.post("/", authMiddleware, async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.userId;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    try {
        const task = await createTask(title, description, userId);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get all tasks for a user
router.get("/", authMiddleware, async (req, res) => {
    const userId = req.user.userId;

    try {
        const tasks = await getTasksByUser(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Update a task
router.put("/:id", authMiddleware, async (req, res) => {
    const { title, description, isComplete } = req.body;
    const taskId = req.params.id;
    const userId = req.user.userId;

    try {
        const task = await updateTask(taskId, title, description, isComplete, userId);
        if (!task) return res.status(404).json({ message: "Task not found" });

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Delete a task
router.delete("/:id", authMiddleware, async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user.userId;

    try {
        const task = await deleteTask(taskId, userId);
        if (!task) return res.status(404).json({ message: "Task not found" });

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;

