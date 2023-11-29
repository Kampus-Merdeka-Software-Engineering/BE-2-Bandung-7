const express = require("express");
const server = express();
const PORT = 3000;


server.get("/", function (request, response) {
    response.send("Home");
});

server.get("/about", function (request, response) {
    response.send("About");
});

server.get("/destination", function (request, response) {
    response.send("Destination");
});

server.get("/contact", function (request, response) {
    response.send("Contact");
});

server.post("/contact", (req, res) => {
    console.log(req.body)
    res.send(req.body)
})


server.listen(PORT, () => {
    console.log(
        `You are running on port url: http://localhost:${PORT}`
    );
});