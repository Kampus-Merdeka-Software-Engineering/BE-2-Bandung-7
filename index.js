const express = require("express");
const server = express();
const PORT = process.env.PORT || 3000;
const IP = '0.0.0.0';
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const dataDestinatios = [
    {
        "id": "1",
        "city": "Roma",
        "country": "Italy"
    },
    {
        "id": "2",
        "city": "Tokyo",
        "country": "Jepang"
    },
    {
        "id": "3",
        "city": "Sydney",
        "country": "Australia"
    },
    {
        "id": "4",
        "city": "New York",
        "country": "Amerika Serikat"
    },
    {
        "id": "5",
        "city": "Bali",
        "country": "Indnesia"
    },
    {
        "id": "6",
        "city": "Reykjavik",
        "country": "Islandia"
    },
]

server.get("/", function (request, response) {
    response.send("Home");
});

server.get("/destination/:city", function (request, response) {
    response.status(200).json({
        success: true,
        message: "retrieve data sucessful",
        data: {
            "id": "1",
            "title": "roma",
            "description": "roma is beautiful city",
            "image": "roma.png"

        }
    })
});

server.get("/contact", function (request, response) {
    response.send("Contact");
});

server.post("/contact", (req, res) => {
    console.log(req.body);
    const { name, email, message } = req.body;
    response.status(200).json({
        success: true,
        message: " data sucessful",
        data: {
            "name": name,
            "email" : email,
            "message" : message,

        }
    })
    

})


server.listen(PORT,IP, () => {
    console.log(
        `You are running on port url: http://localhost:${PORT}`
    );
});