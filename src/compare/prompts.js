import { getRankAndSuit } from "./data.js";
import {
    kabbalahMajors,
    kabbalahRanks,
    kabbalahSuits,
    sefirot,
} from "../kabbalah.js";

// TIME FRAME QUERY

import { getRankWords, allSuitWords } from "./data.js";

function getTimeframeQueries(
    spread,
    question,
    matching,
    opposites,
    isKabbalah
) {
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
                    relevantOpposites,
                    isKabbalah
                ),
            };
        }, {});
    result.advice = getAdviceQuery(
        spread,
        question,
        matching,
        opposites,
        isKabbalah
    );
    return result;
}

function getTimeframeQuery(
    card,
    timeframe,
    question,
    matching,
    opposites,
    isKabbalah
) {
    let result;
    const intro = getIntro(card.name, timeframe, question),
        ending = getEnding(matching, opposites, 8, card.name, timeframe),
        isMinor = card.name.includes(" of ") && !card.name.includes("Wheel");
    if (isMinor) {
        // is Minor Arcana
        let [rank, suit] = card.name.split(" of ");
        suit = suit.replace(" reversed", "");
        const isCourt = ["Page", "Knight", "Queen", "King"].includes(rank),
            // rankWords = getRankWords(rank, card.name.includes(" reversed")),
            suitWords = allSuitWords[suit];
        result =
            intro +
            (isCourt
                ? `This card represents a person with the qualities of "${card.words.join(
                      ", "
                  )}." ` +
                  `What does this card represent about me in the ${timeframe}? ` +
                  `Who else could this card represent in my ${timeframe}? `
                : getWordsLine(card.words)) +
            // getRankLine(rank, rankWords) +
            getSuitLine(suit, suitWords) +
            `How do these meanings relate to my ${timeframe} situation? ` +
            ending;
    } else {
        // is Major Arcana
        result =
            intro +
            getWordsLine(card.words) +
            `What does this Major Arcana card say about my ${timeframe}? ` +
            ending;
    }
    return isKabbalah ? kabbalahWrapper(result, [card]) : result;
}

function getIntro(cardName, timeframe, question) {
    return (
        `I drew the card ${cardName} for my ${timeframe} situation. ` +
        askQuestion(question)
    );
}

function getWordsLine(words) {
    return `This card represents the qualities of "${words.join(", ")}." `;
}

// function getRankLine(rank, rankWords) {
//     return `This card has a rank of ${rank}, which represents ${rankWords.join(
//         ", "
//     )}. `;
// }

function getSuitLine(suit, suitWords) {
    return `This card also has a suit of ${suit}, which represents ${suitWords.join(
        " and "
    )}. `;
}

function getAdviceQuery(spread, question, matching, opposites, isKabbalah) {
    const result =
        getAllWordsLine(spread) +
        askQuestion(question) +
        `How could these cards represent my past, present, and future respectively? ` +
        getMultiRankAndSuit(spread) +
        getEnding(matching, opposites, 20);
    return isKabbalah ? kabbalahWrapper(result, spread) : result;
}

// CUSTOM SPREAD QUERY

function getCustomSpreadQuery(
    spread,
    question,
    matching,
    opposites,
    isKabbalah
) {
    const result =
        getAllWordsLine(spread) +
        askQuestion(question) +
        getMultiRankAndSuit(spread) +
        getEnding(matching, opposites, 20);
    return isKabbalah ? kabbalahWrapper(result, spread) : result;
}

// KABBALAH QUERY (to be added onto other queries)

function kabbalahWrapper(str, spread) {
    return (
        "This is a Tarot card reading that incorporates Kabbalah. " +
        "You must address this at the very beginning of your response. " +
        str +
        getKabbalahQuery(spread)
    );
}

function getKabbalahQuery(spread) {
    return (
        " Also reference Kabbalah in this reading. Throughout your answer, " +
        "make reference to the following information where appropriate: " +
        getKabbalahInfo(spread)
    );
}

function getKabbalahInfo(spread) {
    return spread.map(getCardKabbalah).join("");
}

function getCardKabbalah(card) {
    const { name } = card,
        upright = name.replace(" reversed", ""),
        major = kabbalahMajors[upright];
    if (major) {
        const { from, to } = major.kabbalah.tree;
        return (
            `The Major Arcana card ${name} sits on the Tree of Life between the ` +
            `sefirot ${from}, representing ${sefirot[from].quality}, and ${to}, ` +
            `representing ${sefirot[to].quality}. `
        );
    }
    const [cardRank, cardSuit] = upright.split(" of "),
        rank = kabbalahRanks[cardRank],
        suit = kabbalahSuits[cardSuit],
        { sefira, world } = rank,
        isCourt = !!world;
    return (
        `The card ${name} has a rank of ${cardRank}, which represents ` +
        (isCourt
            ? getWorldInfo(world)
            : `sefira #${isNaN(+cardRank) ? 1 : cardRank}, ${sefira.name}. ` +
              `This sefira represents ${sefira.quality}. `) +
        `The card ${name} also has the suit ${cardSuit}, which represents ` +
        getWorldInfo(suit)
    );
}

function getWorldInfo(world) {
    return (
        `${world.name}, or the ${world.quality} World. This realm holds ` +
        `the element of ${world.element} and represents "${world.represents}." `
    );
}

// SHARED FUNCTIONS

function askQuestion(question) {
    question = question.trim();
    return question
        ? `If the question "${question}" makes sense, ` +
              "answer it in your reading. "
        : "";
}

function getMultiRankAndSuit(spread) {
    const hasRanksOrSuits =
        spread.filter(({ name }) => {
            const { rank, suit } = getRankAndSuit(name);
            return rank || suit;
        }).length > 1;
    return (
        spread
            .map(({ name }) => {
                let { rank, suit } = getRankAndSuit(name);
                if (rank && suit) {
                    suit = suit.replace(" reversed");
                    const isReversed = name.includes(" reversed");
                    return `The card ${name} has the rank of ${rank}${
                        isReversed ? " reversed" : ""
                    } with the meaning "${getRankWords(rank, isReversed).join(
                        ", "
                    )}," and it has the suit of ${suit}, which represents ${allSuitWords[
                        suit
                    ].join(" and ")}. `;
                } else {
                    return "";
                }
            })
            .join("") +
        (hasRanksOrSuits
            ? "If there are any repeating ranks or suits, or multiple reversed cards, " +
              "point them out and their overlapping meanings. "
            : "")
    );
}

function getMatchingLines(matching, cardName, timeframe) {
    const { entries, moreThan1 } = matchingOppositesHelper(matching);
    return entries.length
        ? entries
              .map(
                  ([word, cards]) =>
                      `The cards ${cards.join(", ")} all represent "${word}." `
              )
              .join("") +
              `Emphasize the importance of ${
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
        `Respond with no more than ${sentenceCount} sentences. ` +
        "The tone of your response should be wise yet friendly, " +
        "like a professional Tarot card reader in an intimate setting. " +
        'Address the "seeker" directly without welcoming them, ' +
        "and don't bother signing off."
    );
}

function getAllWordsLine(spread) {
    const isSingle = spread.length === 1;
    return `I drew the card${isSingle ? "" : "s"} ${spread
        .map(
            ({ name, words }) =>
                `${name} with the meaning "${words.join(", ")}"`
        )
        .join("; ")}. `;
}

export { getTimeframeQueries, getCustomSpreadQuery };
