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
    deck = [...majorArcana, ...minorArcana];

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

export default getRandomCards;
