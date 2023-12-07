const express = require("express");
const destinationRoutes = express.Router();
const { prisma } = require("../config/prisma");



// get destination all
destinationRoutes.get("/", async (req, res) => {
    try {
        const destinations = await prisma.destination.findMany();
        res.status(200).json(destinations);
    } catch (error) {
        console.error('Error fetching destinations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// get destination by id
destinationRoutes.get("/:id", async (req, res) => {
    try {
        const destination = await prisma.destination.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });

        if (!destination) {
            res.status(404).json({
                message: "Destination not found",
            });
        } else {
            res.status(200).json(destination);
        }
    } catch (error) {
        console.error('Error fetching destination by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = { destinationRoutes };
