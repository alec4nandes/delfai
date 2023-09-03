import cards from "./cards.js";
import opposites from "./opposites.js";
import getSpread from "./spread.js";
import getMatching from "./matching.js";

const spread = getSpread(),
    matching = getMatching(spread);

console.log(cards);
console.log(opposites);
console.log(spread);
console.log(matching);
