import { getTimeframeQueries, getCustomSpreadQuery } from "./prompts.js";
import { getOppositeWords } from "./data.js";

function compareCards(spread, question, isCustom, isKabbalah, prompt) {
    question = question.trim();
    const matching = {},
        opposites = {},
        spreadWords = spread.map(({ words }) => words).flat(Infinity);
    spreadWords.forEach((word) =>
        processWord(word, spread, matching, opposites)
    );
    // group matching keys
    condense(matching);
    // group opposites values
    Object.values(opposites).forEach(condense);
    // group opposites keys
    condense(opposites);
    const prompts =
            prompt ||
            (isCustom
                ? getCustomSpreadQuery(
                      spread,
                      question,
                      matching,
                      opposites,
                      isKabbalah
                  )
                : getTimeframeQueries(
                      spread,
                      question,
                      matching,
                      opposites,
                      isKabbalah
                  )),
        [past, present, future] = spread;
    return {
        matching,
        opposites,
        question,
        ...(isCustom
            ? { prompt: prompts, spread }
            : {
                  spread: {
                      past: { ...past, prompt: prompts.past },
                      present: { ...present, prompt: prompts.present },
                      future: { ...future, prompt: prompts.future },
                      advice: { prompt: prompts.advice },
                  },
              }),
    };
}

function processWord(word, spread, matching, opposites) {
    if (!matching[word]) {
        // matching
        const matchCards = getRelated(word, spread);
        matchCards.length > 1 && (matching[word] = matchCards);
        // opposites
        const oppoWords = getOppositeWords(word);
        oppoWords.forEach((oppo) => {
            const oppoCards = getRelated(oppo, spread);
            if (oppoCards.length) {
                if (opposites[oppo]) {
                    opposites[oppo][word] = matchCards;
                } else {
                    !opposites[word] &&
                        (opposites[word] = {
                            cards: matchCards,
                        });
                    opposites[word][oppo] = oppoCards;
                }
            }
        });
    }
}

function getRelated(word, spread) {
    return spread
        .filter(({ words }) => words.includes(word))
        .map(({ name }) => name);
}

function condense(obj) {
    let entries = Object.entries(obj).filter(([key]) => key !== "cards");
    entries.forEach(([outerKey, outerVal]) => {
        const keys = entries
            .filter(
                ([innerKey, innerVal]) =>
                    JSON.stringify(innerVal) === JSON.stringify(outerVal)
            )
            .map(([innerKey]) => innerKey);
        if (keys.length > 1) {
            obj[keys.sort().join(", ")] = outerVal;
            keys.forEach((key) => delete obj[key]);
        }
    });
}

export { compareCards };
