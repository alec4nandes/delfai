import { cards, opposites } from "./data.js";

function getTestSpread() {
    const names1 = [
            // test opposites grouping:
            "10 of Cups",
            "6 of Pentacles reversed",
            "Devil reversed",
        ],
        names2 = [
            // test matching grouping:
            "Sun reversed",
            "Queen of Cups reversed",
            "Page of Cups reversed",
        ],
        rev = " reversed";
    return [...names1].map((name) =>
        getCard(name.replace(rev, ""), name.includes(rev))
    );
}

function getSpread(size = 3) {
    const getRandom = (arr) => arr[~~(Math.random() * arr.length)],
        getRandomCard = () => getRandom(Object.keys(cards)),
        getIsReversed = () => Math.random() < 0.5,
        names = new Set();
    while (names.size < size) {
        names.add(getRandomCard());
    }
    return [...names].map((name) => getCard(name, getIsReversed()));
}

function getCard(name, isReversed) {
    const words = isReversed ? getCardOpposites(name) : cards[name];
    name = `${name}${isReversed ? " reversed" : ""}`;
    return { name, words };
}

function getCardOpposites(name) {
    return [
        ...new Set(cards[name].map(getOppositeWords).flat(Infinity)),
    ].sort();
}

function getOppositeWords(word) {
    return opposites
        .filter((pair) => pair.includes(word))
        .map((pair) => pair[pair.indexOf(word) ? 0 : 1])
        .filter(Boolean); // in case empty string in pair
}

export { getSpread, getTestSpread, getOppositeWords };
