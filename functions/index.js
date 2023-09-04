// Replace if using a different env file or config
require("dotenv").config({ path: "./.env" });
const OpenAI = require("openai"),
    { openAiApiKey } = require("./openai-api-key.js"),
    express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    functions = require("firebase-functions"),
    stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// CARD READING

const IS_DEVELOPMENT = true,
    getCors = () =>
        cors({
            origin: IS_DEVELOPMENT
                ? ["http://localhost:5000", "http://localhost:3000"]
                : ["https://delfai.web.app"],
        }),
    setUpServer = (server) => {
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: true }));
        server.use(getCors());
    },
    openai = new OpenAI({ apiKey: openAiApiKey }),
    readingServer = express();

setUpServer(readingServer);

["past", "present", "future", "advice"].forEach(createRoute);

function createRoute(timeframe) {
    const isAdvice = timeframe === "advice";
    readingServer.post(`/${timeframe}`, async function (req, res) {
        const { card, cards, question, prompts } = req.body,
            content = isAdvice
                ? getAdviceContent(cards, question, prompts)
                : getContent(card, timeframe, question, prompts),
            stream = await getStream(content);
        console.log(prompts);
        console.log(content);
        for await (const part of stream) {
            const moreText = part.choices[0]?.delta?.content || "";
            res.write(moreText);
        }
        res.end();
    });
}

function getAdviceContent(cards, question, prompts) {
    return `What life advice would you give me if I drew the following tarot cards: ${cards
        .map(
            (card, i) =>
                `${card} for my ${i ? (i > 1 ? "future" : "present") : "past"}`
        )
        .join(", ")
        .trim()}. Please write only one paragraph. ${askQuestion(question)} ${
        prompts?.join(" ") || ""
    }`;
}

function getContent(card, timeframe, question, prompts) {
    return `Please write only one paragraph about the tarot card ${card} and how it can relate to my ${timeframe}. ${askQuestion(
        question
    )} ${prompts?.join(" ") || ""}`;
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

module.exports.reading = functions.https.onRequest(readingServer);

// PAYMENT

const paymentServer = express();

setUpServer(paymentServer);

paymentServer.post("/subscribe", async (req, res) => {
    res.send(await createSubscription(req.body));

    async function createSubscription(subReq) {
        const {
            name,
            email,
            paymentMethod: payment_method,
            priceId: price,
        } = subReq;
        // create a stripe customer
        const customer = await stripe.customers.create({
            name,
            email,
            payment_method,
            invoice_settings: {
                default_payment_method: payment_method,
            },
        });

        // create a stripe subscription
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price }],
            payment_settings: {
                payment_method_options: {
                    card: {
                        request_three_d_secure: "any",
                    },
                },
                payment_method_types: ["card"],
                save_default_payment_method: "on_subscription",
            },
            expand: ["latest_invoice.payment_intent"],
            metadata: { customerEmail: email },
        });

        // return the client secret and subscription id
        return {
            clientSecret:
                subscription.latest_invoice.payment_intent.client_secret,
            subscriptionId: subscription.id,
        };
    }
});

paymentServer.post("/unsubscribe", async (req, res) => {
    try {
        await stripe.subscriptions.update(req.body.subscriptionId, {
            cancel_at_period_end: true,
        });
        res.send({ confirm: true });
    } catch (err) {
        res.send({ confirm: false });
    }
});

module.exports.payment = functions.https.onRequest(paymentServer);
