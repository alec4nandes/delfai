import opposites from "./opposites.js";

function getMatching(spread) {
    const result = spread.reduce((acc, card) => {
        card.words.forEach((word) => {
            acc[word]?.matching.push(card) ||
                (acc[word] = { matching: [card] });
            acc[word].opposites = opposites[word].reduce(
                (acc, oppo) => ({
                    ...acc,
                    [oppo]: spread.filter((card) => card.words.includes(oppo)),
                }),
                {}
            );
        });
        return acc;
    }, {});
    Object.entries(result).forEach(([word, { matching, opposites }]) => {
        Object.entries(opposites).forEach(
            ([oppo, cards]) => !cards.length && delete opposites[oppo]
        );
        matching.length < 2 &&
            !Object.keys(opposites).length &&
            delete result[word];
    });
    return result;
}

export default getMatching;
