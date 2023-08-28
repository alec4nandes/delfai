const express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    { getSpreadData } = require("./read-cards.js"),
    functions = require("firebase-functions");

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(
    cors({
        origin: ["https://delfai.web.app", "http://localhost:5000"],
    })
);

server.post("/", async function (req, res) {
    const { question } = req.body;
    res.send(await getSpreadData(question));
});

const api = functions.https.onRequest(server);

module.exports = { api };
