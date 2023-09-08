function getCustomSpreadPrompt({ spread, matching, opposites, question }) {
    const spreadCards = spread.map(({ name }) => name);
    return `Please analyze the following code representing a tarot card reading:\n\n${JSON.stringify(
        spread,
        null,
        2
    )}.\n\nGiven this data, what tarot reading would you give me? ${getComparePrompts(
        {
            spreadCards,
            matching,
            opposites,
            isCustom: true,
        }
    ).join(" ")} ${askQuestion(
        question
    )} Please respond with a direct and familiar tone, and don't thank me for any input or for providing you with raw data.`;
}

function getComparePrompts({ spreadCards, matching, opposites, isCustom }) {
    const match = Object.entries(matching).map(
            ([words, cards]) =>
                `Please focus on "${words}" in your answer, as it relates to ${
                    isCustom
                        ? cards.join(" and ")
                        : listCards(cards, spreadCards)
                }.`
        ),
        oppos = Object.entries(opposites).map(
            ([words, info]) =>
                `Please focus on how the meaning of "${words}" for ${
                    isCustom
                        ? info.cards.join(" and ")
                        : listCards(info.cards, spreadCards)
                } contrasts with ${Object.entries(info)
                    .map(
                        ([oppos, cards]) =>
                            oppos !== "cards" &&
                            `the meaning of "${oppos}" for ${
                                isCustom
                                    ? cards.join(" and ")
                                    : listCards(cards, spreadCards)
                            }`
                    )
                    .filter(Boolean)
                    .join(", ")}.`
        );
    return [...match, ...oppos];
}

function writeComparePrompts({
    spread,
    matching,
    opposites,
    question,
    isCustom,
}) {
    const spreadCards = spread.map(({ name }) => name),
        prompts = getComparePrompts({
            spreadCards,
            matching,
            opposites,
            isCustom,
        }),
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

export { getCustomSpreadPrompt, writeComparePrompts };
