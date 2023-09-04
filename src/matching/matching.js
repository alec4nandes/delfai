import opposites from "./opposites.js";

function getTimeframe(card, spread) {
    const i = spread.indexOf(card);
    return i ? (i > 1 ? "future" : "present") : "past";
}

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

    const prompts = spread.reduce(
        (acc, card) => ({
            ...acc,
            [`${card.name.replace("The ", "")}${
                card.is_reversed ? " reversed" : ""
            }`]: Object.entries(result)
                .map(([word, { matching, opposites }]) => {
                    const result = [];
                    if (matching.includes(card)) {
                        const matchingCards = matching.filter(
                            (c) => c !== card
                        );
                        matchingCards.length &&
                            result.push(
                                `This card has a strong connection to the word "${word}," which also shows up in this reading in ${helper(
                                    matchingCards,
                                    spread
                                )}. Please emphasize this in your response.`
                            );
                    }
                    Object.entries(opposites)
                        .filter(([_, oppoCards]) => oppoCards.includes(card))
                        .forEach(([oppo]) =>
                            result.push(
                                `This card means "${oppo}," which contrasts with ${helper(
                                    matching,
                                    spread
                                )} representing the word "${word}." How could you explain this contrast in the reading?`
                            )
                        );
                    return result;
                })
                .flat(Infinity),
        }),
        {}
    );

    const advice = Object.entries(result).map(
        ([word, { matching, opposites }]) => {
            const cardNames = matching
                    .map((card) => `"${getCardName(card)}"`)
                    .join(", "),
                oppositeWords = Object.entries(opposites);
            return (
                `Keep in mind ${cardNames} and their connection to the word "${word}"` +
                (oppositeWords.length
                    ? `, which contrasts with the word${
                          oppositeWords.length > 1 ? "s" : ""
                      } ${oppositeWords
                          .map(
                              ([oppo, oppoCards]) =>
                                  `"${oppo}" in the card${
                                      oppoCards.length > 1 ? "s" : ""
                                  } ${oppoCards
                                      .map((card) => `"${getCardName(card)}"`)
                                      .join(", ")}`
                          )
                          .join(" and ")}.`
                    : ".")
            );
        }
    );

    return { ...prompts, advice };
}

function helper(arr, spread) {
    return `the card${arr.length > 1 ? "s" : ""} ${arr
        .map(
            (card) =>
                `"${getCardName(card)}" in the ${getTimeframe(card, spread)}`
        )
        .join(" and ")}`;
}

function getCardName(card) {
    return `${card.name}${card.is_reversed ? " reversed" : ""}`;
}

export default getMatching;
