import cards from "./cards.js";
import opposites from "./opposites.js";

function getSpread(size = 3) {
    const spread = new Set(),
        names = Object.keys(cards);
    while (spread.size < size) {
        spread.add(names[~~(Math.random() * names.length)]);
    }
    return [...spread].map((name) => {
        const is_reversed = Math.random() < 0.5;
        return { name, is_reversed, words: getWords(name, is_reversed) };
    });
}

function getWords(name, is_reversed) {
    return is_reversed
        ? cards[name]
              .map((word) => opposites[word])
              .flat(Infinity)
              .sort()
        : cards[name];
}

export default getSpread;
