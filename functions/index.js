const OpenAI = require("openai"),
    { apiKey } = require("./api-key.js"),
    express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    functions = require("firebase-functions");

const IS_DEVELOPMENT = false,
    openai = new OpenAI({ apiKey }),
    server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(
    cors({
        // TODO: remove localhost for production
        origin: IS_DEVELOPMENT
            ? ["http://localhost:5000", "http://localhost:3000"]
            : ["https://delfai.web.app"],
    })
);

["past", "present", "future", "advice"].forEach(createRoute);

function createRoute(timeframe) {
    const isAdvice = timeframe === "advice";
    server.post(`/${timeframe}`, async function (req, res) {
        const { card, cards, question } = req.body,
            content = isAdvice
                ? getAdviceContent(cards, question)
                : getContent(card, timeframe, question),
            stream = await getStream(content);
        for await (const part of stream) {
            const moreText = part.choices[0]?.delta?.content || "";
            res.write(moreText);
        }
        res.end();
    });
}

function getAdviceContent(cards, question) {
    return `What life advice would you give me if I drew the following tarot cards: ${cards
        .map(
            (card, i) =>
                `${card} for my ${i ? (i > 1 ? "future" : "present") : "past"}`
        )
        .join(", ")
        .trim()}. Please write only one paragraph. ${askQuestion(question)}`;
}

function getContent(card, timeframe, question) {
    return `Please write only one paragraph about the tarot card ${card} and how it can relate to my ${timeframe}. ${askQuestion(
        question
    )}`;
}

function askQuestion(question) {
    return `If, and only if, my question: "${question}" makes sense, please address it in your paragraph.`;
}

async function getStream(content) {
    return await openai.chat.completions.create({
        messages: [{ role: "user", content }],
        model: "gpt-3.5-turbo",
        stream: true,
    });
}

const api = functions.https.onRequest(server);

module.exports = { api };
