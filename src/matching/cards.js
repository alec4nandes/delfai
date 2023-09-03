import openAi from "./open-ai.js";

function getCards() {
    const result = {};
    Object.entries(openAi).map(([name, words]) => {
        helper(name, Object.keys(words));
        Object.values(words).forEach(
            ({ opposite_meaning: oppo, opposite_cards: oppoCards }) =>
                oppoCards.forEach((card) => helper(card, [oppo]))
        );
    });
    return result;

    function helper(name, pushed) {
        result[name]?.push(...pushed) || (result[name] = pushed);
        result[name] = [
            ...new Set(result[name].map((word) => word.toLowerCase())),
        ].sort();
    }
}

const cards = getCards();

export default cards;
