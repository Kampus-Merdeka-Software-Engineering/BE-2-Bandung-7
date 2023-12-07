const express = require("express");
const messageRoutes = express.Router();
const { prisma } = require("../config/prisma");

// Validation middleware for the message creation endpoint
const validateMessage = (req, res, next) => {
    const { name, email, message } = req.body;

    // Validate name
    if (!name || name.length < 2) {
        return res.status(400).json({
            success: false,
            message: "Name must be at least 2 characters and cannot be empty.",
        });
    }

    // Validate email using a basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email address.",
        });
    }

    // Validate message
    if (!message) {
        return res.status(400).json({
            success: false,
            message: "Message cannot be empty.",
        });
    }

    // If all validations pass, proceed to the next middleware or route handler
    next();
};

// Get all messages
messageRoutes.get("/", async (req, res) => {
    try {
        const messages = await prisma.message.findMany();
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Create new message with validation middleware
messageRoutes.post("/", validateMessage, async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newMessage = await prisma.message.create({
            data: {
                name: name,
                email: email,
                message: message,
            },
        });
        res.status(201).json({
            success: true,
            message: "Message created",
            data: newMessage,
        });
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = { messageRoutes };
