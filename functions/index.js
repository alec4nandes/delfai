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

const IS_DEVELOPMENT = false,
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

readingServer.post("/", async function (req, res) {
    const { prompt } = req.body,
        stream = await getStream(prompt);
    IS_DEVELOPMENT && console.log(prompt);
    for await (const part of stream) {
        const moreText = part.choices[0]?.delta?.content || "";
        res.write(moreText);
    }
    res.end();
});

async function getStream(content) {
    return await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content:
                    "You are a wise yet friendly Tarot card reader explaining my cards in an intimate setting.",
            },
            { role: "user", content },
        ],
        model: "gpt-3.5-turbo",
        stream: true,
        temperature: 0.7,
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
