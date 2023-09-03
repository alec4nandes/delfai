import openAi from "./open-ai.js";

function getAllOpposites() {
    const result = {};
    Object.values(openAi).forEach((value) =>
        Object.entries(value).forEach(([word, { opposite_meaning: oppo }]) => {
            helper(word, oppo);
            helper(oppo, word);
        })
    );
    return result;

    function helper(word, oppo) {
        word = word.toLowerCase();
        result[word]?.push(oppo) || (result[word] = [oppo]);
        result[word] = [
            ...new Set(result[word].map((w) => w.toLowerCase())),
        ].sort();
    }
}

const opposites = getAllOpposites();

export default opposites;
