import OpenAI from "openai";

const majorArcana = [
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
    deck = [...majorArcana, ...minorArcana],
    apiKey = process.env.OPENAI_API_KEY,
    openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true }),
    singleParagraph = "Please answer with a single, separate paragraph.";

async function getSpreadData() {
    const cards = getRandomCards(3),
        readings = await getReadings(cards),
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
    return { ...result, advice: { reading: readings.at(-1) } };
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

async function getReadings(cards) {
    const completion = await openai.chat.completions.create({
        messages: getMessages(cards),
        model: "gpt-3.5-turbo",
    });
    return completion?.choices?.[0]?.message?.content
        ?.split("\n")
        .map((str) => str.replaceAll("\n", " ").trim())
        .filter(Boolean);
}

function getMessages(cards) {
    return [...cards, null].map((card, i) => ({
        role: "user",
        content: card ? getMessage(card, i) : getFinalMessage(cards),
    }));
}

function getMessage(card, i) {
    const time = getTimeFromIndex(i);
    return `What does the tarot card ${card} say about a person's ${time}? ${singleParagraph}`;
}

function getFinalMessage(cards) {
    const situations = cards
        .map(
            (card, i) =>
                `the ${card} tarot card for their ${getTimeFromIndex(
                    i
                )} situation`
        )
        .join(" and ");
    return `What life advice would you give someone who drew ${situations}? ${singleParagraph}`;
}

function getTimeFromIndex(i) {
    return i ? (i > 1 ? "future" : "present") : "past";
}

export default getSpreadData;
