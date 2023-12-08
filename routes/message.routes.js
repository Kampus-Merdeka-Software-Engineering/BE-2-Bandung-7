const express = require("express");
const messageRoutes = express.Router();
const { prisma } = require("../config/prisma");
const { validateMessage } = require("../middleware/validationMiddleware");


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
