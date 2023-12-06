require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { destinationRoutes } = require("./routes/destination.routes");
const { messageRoutes } = require('./routes/message.routes');
const app = express();
const PORT = process.env.PORT || 3000;
const IP = '0.0.0.0';

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
    res.send("ready to respond !");
});

// destination routes
app.use("/destinations", destinationRoutes);

// message routes
app.use("/messages", messageRoutes);

//Rote that does not exist will display this
app.all("*", async (req, res) => {
    res.json({
        message: "Routes You're looking is not found",
    });
});

app.listen(PORT, IP, () => {
    console.log(
        `You are running on port url: http://localhost:${PORT}`
    );
});