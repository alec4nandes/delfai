// Replace if using a different env file or config
require("dotenv").config({ path: "./.env" });
const OpenAI = require("openai"),
    express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    functions = require("firebase-functions"),
    stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
    };

// DECAN

const decan = express(),
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

setUpServer(decan);

decan.post("/", async function (req, res) {
    const { prompt } = req.body,
        result = await getDecan(prompt);
    res.send(result);
});

async function getDecan(content) {
    return await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content:
                    "You are a tarot card reader writing a social media post.",
            },
            { role: "user", content },
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.7,
    });
}

module.exports.decan = functions.https.onRequest(decan);

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

// SECRET KEY

const openAiServer = express();

setUpServer(openAiServer);

openAiServer.post("/", async (req, res) => {
    res.send(process.env.OPENAI_API_KEY);
});

module.exports.openai = functions.https.onRequest(openAiServer);
