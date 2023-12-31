import { allCards, getCardOpposites } from "./data.js";

function getTestSpread() {
    const names1 = [
            // test opposites grouping:
            "10 of Cups",
            "6 of Pentacles reversed",
            "Devil reversed",
        ],
        // names2 = [
        //     // test matching grouping:
        //     "Sun reversed",
        //     "Queen of Cups reversed",
        //     "Page of Cups reversed",
        // ],
        rev = " reversed";
    return [...names1].map((name) =>
        getCard(name.replace(rev, ""), name.includes(rev))
    );
}

function getSpread(size = 3, names) {
    if (names) {
        return names.map((name) =>
            getCard(name.replace(" reversed", ""), name.includes(" reversed"))
        );
    } else {
        const getRandom = (arr) => arr[~~(Math.random() * arr.length)],
            getRandomCard = () => getRandom(Object.keys(allCards)),
            getIsReversed = () => Math.random() < 0.5;
        names = new Set();
        while (names.size < size) {
            names.add(getRandomCard());
        }
        return [...names].map((name) => getCard(name, getIsReversed()));
    }
}

function getCard(name, isReversed) {
    const words = isReversed ? getCardOpposites(name) : allCards[name];
    name = `${name}${isReversed ? " reversed" : ""}`;
    return { name, words };
}

export { getSpread, getTestSpread };
