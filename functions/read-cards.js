const OpenAI = require("openai"),
    { apiKey } = require("./api-key.js");

const openai = new OpenAI({ apiKey }),
    majorArcana = [
        "Fool",
        "Magician",
        "High Priestess",
        "Empress",
        "Emperor",
        "Hierophant",
        "Lovers",
        "Chariot",
        "Strength",
        "Hermit",
        "Wheel of Fortune",
        "Justice",
        "Hanged Man",
        "Death",
        "Temperance",
        "Devil",
        "Tower",
        "Star",
        "Moon",
        "Sun",
        "Judgement",
        "World",
    ],
    suits = ["Wands", "Cups", "Swords", "Pentacles"],
    courts = ["Page", "Knight", "Queen", "King"],
    ranks = [
        ...new Array(10).fill(1).map((rank, i) => (i ? rank + i : "Ace")),
        ...courts,
    ],
    minorArcana = suits
        .map((suit) => ranks.map((rank) => `${rank} of ${suit}`))
        .flat(Infinity),
    deck = [...majorArcana, ...minorArcana];

async function getSpreadData(question) {
    const cards = getRandomCards(3),
        readings = await getReadings(cards, question),
        getTimeFromIndex = (i) => (i ? (i > 1 ? "future" : "present") : "past"),
        result = cards.reduce(
            (acc, card, i) => ({
                ...acc,
                [getTimeFromIndex(i)]: {
                    card,
                    reading: readings[i],
                },
            }),
            {}
        );
    return { ...result, advice: { reading: readings.at(-1) }, question };
}

function getRandomCards(size = 3) {
    const result = new Set();
    while (result.size < size) {
        result.add(getRandomCard());
    }
    return [...result].map(
        (card) => `${card}${Math.random() < 0.5 ? " reversed" : ""}`
    );
}

function getRandomCard() {
    return deck[~~(Math.random() * deck.length)];
}

async function getReadings(cards, question) {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "user",
                content: writeMessage(cards, question),
            },
        ],
        model: "gpt-3.5-turbo",
    });
    return completion?.choices?.[0]?.message?.content
        ?.split("\n")
        .map((str) => str.trim())
        .filter(Boolean);
}

function writeMessage(cards, question) {
    const [past, present, future] = cards;
    return `
        Please write four paragraphs separated by the new-line character "\n".
        If, and only if, the question "${question}" makes sense, please address it in each paragraph.
        The first paragraph is only about how the tarot card ${past} can relate to someone's past.
        The second paragraph is only about how the tarot card ${present} can relate to someone's present.
        The third paragraph is only about how the tarot card ${future} can relate to someone's future.
        The fourth and final paragraph gives life advice after taking the three previously mentioned tarot cards into consideration.
    `;
}

module.exports = { getSpreadData };
