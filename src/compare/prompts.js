// TIME FRAME QUERY

import { getRankWords, allSuitWords } from "./data.js";

function getTimeframeQueries(spread, question, matching, opposites) {
    // spread is a 3-card array
    const [past, present, future] = spread,
        timeframes = { past, present, future },
        result = Object.entries(timeframes).reduce((acc, [timeframe, card]) => {
            const relevantMatching = Object.fromEntries(
                    Object.entries(matching).filter(([_, cards]) =>
                        cards.includes(card.name)
                    )
                ),
                relevantOpposites = Object.fromEntries(
                    Object.entries(opposites).filter(
                        ([_, { cards, ...oppos }]) =>
                            cards.includes(card.name) ||
                            Object.values(oppos).flat().includes(card.name)
                    )
                );
            return {
                ...acc,
                [timeframe]: getTimeframeQuery(
                    card,
                    timeframe,
                    question,
                    relevantMatching,
                    relevantOpposites
                ),
            };
        }, {});
    result.advice = getAdviceQuery(spread, question, matching, opposites);
    return result;
}

function getTimeframeQuery(card, timeframe, question, matching, opposites) {
    const intro = getIntro(card.name, timeframe, question),
        ending = getEnding(matching, opposites, 8, card.name, timeframe),
        isMinor = card.name.includes(" of ") && !card.name.includes("Wheel");
    if (isMinor) {
        // is Minor Arcana
        let [rank, suit] = card.name.split(" of ");
        suit = suit.replace(" reversed", "");
        const isCourt = ["Page", "Knight", "Queen", "King"].includes(rank),
            rankWords = getRankWords(rank, card.name.includes(" reversed")),
            suitWords = allSuitWords[suit];
        return (
            intro +
            (isCourt
                ? `This card represents a person with the qualities of "${card.words.join(
                      ", "
                  )}." ` +
                  `What does this card represent about me in the ${timeframe}? ` +
                  `Who else could this card represent in my ${timeframe}? `
                : getWordsLine(card.words)) +
            getRankLine(rank, rankWords) +
            getSuitLine(suit, suitWords) +
            `How do these meanings relate to my ${timeframe}? ` +
            ending
        );
    } else {
        // is Major Arcana
        return (
            intro +
            getWordsLine(card.words) +
            `What does this Major Arcana card say about my ${timeframe}? ` +
            ending
        );
    }
}

function getIntro(cardName, timeframe, question) {
    return (
        `You are my Tarot card reader, and I drew the card ${cardName} for my ${timeframe} situation. ` +
        askQuestion(question)
    );
}

function getWordsLine(words) {
    return `This card represents the qualities of "${words.join(", ")}." `;
}

function getRankLine(rank, rankWords) {
    return `This card has a rank of ${rank}, which represents ${rankWords.join(
        ", "
    )}. `;
}

function getSuitLine(suit, suitWords) {
    return `This card also has a suit of ${suit}, which represents ${suitWords.join(
        ", "
    )}. `;
}

function getAdviceQuery(spread, question, matching, opposites) {
    return (
        getAllWordsLine(spread) +
        askQuestion(question) +
        `How could these cards represent my past, present, and future respectively? ` +
        getEnding(matching, opposites, 20)
    );
}

// CUSTOM SPREAD QUERY

function getCustomSpreadQuery(spread, question, matching, opposites) {
    return (
        getAllWordsLine(spread) +
        askQuestion(question) +
        getEnding(matching, opposites, 20)
    );
}

// SHARED FUNCTIONS

function askQuestion(question) {
    question = question.trim();
    return question
        ? `If the question "${question}" makes sense, ` +
              "please answer it in your reading. "
        : "";
}

function getMatchingLines(matching, cardName, timeframe) {
    const { entries, moreThan1 } = matchingOppositesHelper(matching);
    return entries.length
        ? entries
              .map(
                  ([word, cards]) =>
                      `The cards ${cards.join(", ")} all represent "${word}." `
              )
              .join(" ") +
              `Please emphasize the importance of ${
                  moreThan1 ? "these" : "this"
              } connection${moreThan1 ? "s" : ""}${
                  cardName
                      ? ` as ${moreThan1 ? "they" : "it"} relate${
                            moreThan1 ? "" : "s"
                        } to ${cardName}`
                      : ""
              }${timeframe ? ` in my ${timeframe}` : ""}. `
        : "";
}

function getOppositeLines(opposites, cardName, timeframe) {
    const { entries, moreThan1 } = matchingOppositesHelper(opposites);
    return entries.length
        ? entries
              .map(([word, { cards, ...opposites }]) => {
                  const isSingle = cards.length === 1;
                  return `The card${isSingle ? "" : "s"} ${cards.join(
                      ", "
                  )} represent${
                      isSingle ? "s" : ""
                  } "${word}," which contrasts with ${Object.entries(opposites)
                      .map(
                          ([oppo, oppoCards]) =>
                              `"${oppo}" in the card${
                                  oppoCards.length > 1 ? "s" : ""
                              } ${oppoCards.join(", ")}`
                      )
                      .join("; ")}. `;
              })
              .join("") +
              `How ${moreThan1 ? "do these" : "does this"} contradiction${
                  moreThan1 ? "s" : ""
              } affect ${cardName ? `${cardName} in ` : ""}my ${
                  timeframe || "reading"
              }? `
        : "";
}

function matchingOppositesHelper(obj) {
    const entries = Object.entries(obj),
        moreThan1 = entries.length > 1;
    return { entries, moreThan1 };
}

function getEnding(
    matching,
    opposites,
    sentenceCount = 8,
    cardName,
    timeframe
) {
    return (
        getMatchingLines(matching, cardName, timeframe) +
        getOppositeLines(opposites, cardName, timeframe) +
        `Please respond with no more than ${sentenceCount} sentences. ` +
        "The tone of your response should be wise yet friendly, " +
        "like a professional Tarot card reader in an intimate setting. " +
        'Please address the "seeker" directly without welcoming them.'
    );
}

function getAllWordsLine(spread) {
    const isSingle = spread.length === 1;
    return `You are my Tarot card reader, and I drew the card${
        isSingle ? "" : "s"
    } ${spread
        .map(
            ({ name, words }) =>
                `${name} with the meaning "${words.join(", ")}"`
        )
        .join("; ")}. `;
}

export { getTimeframeQueries, getCustomSpreadQuery };
