const express = require("express");
const messageRoutes = express.Router();
const { prisma } = require("../config/prisma");

//get all message
messageRoutes.get("/", async (req, res) => {
    const messages = await prisma.message.findMany()
    res.status(200).send(messages);
})

// create new message
messageRoutes.post("/", async (req, res) => {
    const { name, email, message } = req.body;
    if (name.length > 3) {
        return res.status(400).json({
            success: false,
            message: "name should be longer than 3 char",
        });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "email format is wrong",
        });
    }
    if (message.length < 1) {
        return res.status(400).json({
            success: false,
            message: "message can not be empty",
        });
    }
    const newMessage = await prisma.message.create({
        data: {
            name: name,
            email: email,
            message: message,
        },
    });
    res.status(201).json({
        message: "message created",
        data: newMessage,
    })
})


module.exports = { messageRoutes };