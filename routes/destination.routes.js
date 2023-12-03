const express = require("express");
const destinationRoutes = express.Router();
const { prisma } = require("../config/prisma");



// get destination all
destinationRoutes.get("/", async (req, res) => {
    const destination = await prisma.destination.findMany();
    res.status(200).send(destination);
});

//get destination by id 
destinationRoutes.get("/:id", async (req, res) => {
    const destination = await prisma.destination.findUnique({
        where: {
            id:parseInt(req.params.id),
        },
    });
    if (!destination) res.status(404).json({
        message: "Destination not found",
    });
    else res.status(200).json(destination);
});

module.exports = { destinationRoutes };
