function writeComparePrompts({ spread, matching, opposites, question }) {
    const spreadCards = spread.map(({ name }) => name),
        match = Object.entries(matching).map(
            ([words, cards]) =>
                `Please focus on "${words}" in your answer, as it relates to ${listCards(
                    cards,
                    spreadCards
                )}.`
        ),
        oppos = Object.entries(opposites).map(
            ([words, info]) =>
                `Please focus on how the meaning of "${words}" for ${listCards(
                    info.cards,
                    spreadCards
                )} contrasts with ${Object.entries(info)
                    .map(
                        ([oppos, cards]) =>
                            oppos !== "cards" &&
                            `the meaning of "${oppos}" for ${listCards(
                                cards,
                                spreadCards
                            )}`
                    )
                    .filter(Boolean)
                    .join(", ")}.`
        );
    const prompts = [...match, ...oppos],
        [past, present, future] = spread.map((card) =>
            getTimePrompt(card, spreadCards, prompts, question)
        ),
        advice = getAdvicePrompt(spreadCards, prompts, question);
    return { past, present, future, advice };
}

function listCards(cards, spreadCards) {
    return cards
        .map((name) => {
            const timeframe = getTimeframe(name, spreadCards);
            return `"${name}" for my ${timeframe} situation`;
        })
        .join(" and ");
}

function getTimeframe(name, spreadCards) {
    const i = spreadCards.indexOf(name);
    return i ? (i > 1 ? "future" : "present") : "past";
}

function getTimePrompt(card, spreadCards, prompts, question) {
    const { name, words } = card,
        timeframe = getTimeframe(name, spreadCards),
        relevantPrompts = prompts.filter((prompt) => prompt.includes(name));
    return `
        I drew the tarot card "${name}" for my ${timeframe} situation.
        What does this mean, given the card's meaning of ${words.join(
            " and "
        )}? ${relevantPrompts.join(" ")} ${askQuestion(question)}
    `
        .replace(/[\s]+/g, " ")
        .trim();
}

function getAdvicePrompt(spreadCards, prompts, question) {
    return `What life advice would you give me after I drew ${listCards(
        spreadCards,
        spreadCards
    )}? ${prompts.join(" ")} ${askQuestion(question)}`.trim();
}

function askQuestion(question) {
    question = question.trim();
    return question
        ? `If the question "${question}" makes any sense, please address it in your response.`
        : "";
}

export { writeComparePrompts };
