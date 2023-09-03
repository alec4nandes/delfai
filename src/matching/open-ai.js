const openAi = {
    "The Fool": {
        Spontaneous: {
            opposite_meaning: "Cautious",
            opposite_cards: ["The Chariot", "The Emperor", "Justice"],
        },
        Carefree: {
            opposite_meaning: "Wary",
            opposite_cards: ["The Lovers", "The Hermit", "The Moon"],
        },
        Innocent: {
            opposite_meaning: "Experienced",
            opposite_cards: [
                "The Hermit",
                "The Hanged Man",
                "The High Priestess",
            ],
        },
        Optimistic: {
            opposite_meaning: "Pessimistic",
            opposite_cards: ["The Tower", "Death", "The Devil"],
        },
        Adventure: {
            opposite_meaning: "Stagnation",
            opposite_cards: ["The Magician", "The Chariot", "The Fool"],
        },
    },
    "The Magician": {
        Skilled: {
            opposite_meaning: "Inept",
            opposite_cards: ["The Fool", "The Hanged Man", "The Hermit"],
        },
        Manifestation: {
            opposite_meaning: "Illusion",
            opposite_cards: ["The High Priestess", "The Moon", "The Chariot"],
        },
        Resourceful: {
            opposite_meaning: "Ineffective",
            opposite_cards: ["The Emperor", "The Chariot", "The Hierophant"],
        },
        Creative: {
            opposite_meaning: "Uninspired",
            opposite_cards: ["The Empress", "The Hanged Man", "The Devil"],
        },
        Power: {
            opposite_meaning: "Weakness",
            opposite_cards: ["The Emperor", "Strength", "The Hanged Man"],
        },
    },
    "The High Priestess": {
        Intuitive: {
            opposite_meaning: "Rational",
            opposite_cards: ["The Hierophant", "The Emperor", "Justice"],
        },
        Mystery: {
            opposite_meaning: "Clarity",
            opposite_cards: ["The Star", "The Sun", "The Moon"],
        },
        Feminine: {
            opposite_meaning: "Masculine",
            opposite_cards: ["The Emperor", "The Lovers", "The Empress"],
        },
        Subconscious: {
            opposite_meaning: "Conscious",
            opposite_cards: ["The Chariot", "The Tower", "The Magician"],
        },
        Silence: {
            opposite_meaning: "Speech",
            opposite_cards: ["The Fool", "The Chariot", "The Hierophant"],
        },
    },
    "The Empress": {
        Nurturing: {
            opposite_meaning: "Neglectful",
            opposite_cards: ["The Devil", "The Hanged Man", "The Tower"],
        },
        Abundance: {
            opposite_meaning: "Scarcity",
            opposite_cards: ["The Hermit", "The Lovers", "The Moon"],
        },
        Fertility: {
            opposite_meaning: "Barrenness",
            opposite_cards: [
                "The Emperor",
                "The High Priestess",
                "The Chariot",
            ],
        },
        Maternal: {
            opposite_meaning: "Indifferent",
            opposite_cards: ["The Fool", "The Hanged Man", "The Hierophant"],
        },
        Comfort: {
            opposite_meaning: "Discomfort",
            opposite_cards: ["The Chariot", "The Tower", "The Magician"],
        },
    },
    "The Emperor": {
        Authority: {
            opposite_meaning: "Subordination",
            opposite_cards: ["The Fool", "The Hanged Man", "The Hermit"],
        },
        Leadership: {
            opposite_meaning: "Followership",
            opposite_cards: ["The Lovers", "The High Priestess", "The Moon"],
        },
        Control: {
            opposite_meaning: "Chaos",
            opposite_cards: ["The Chariot", "The Tower", "The Magician"],
        },
        Structure: {
            opposite_meaning: "Anarchy",
            opposite_cards: ["The Empress", "The Hanged Man", "The Devil"],
        },
        Order: {
            opposite_meaning: "Disorder",
            opposite_cards: ["Justice", "The Hermit", "The Hierophant"],
        },
    },
    "The Hierophant": {
        Tradition: {
            opposite_meaning: "Rebellion",
            opposite_cards: ["The Fool", "The Tower", "The Devil"],
        },
        Conformity: {
            opposite_meaning: "Nonconformity",
            opposite_cards: ["The Lovers", "The Empress", "The Chariot"],
        },
        Spiritual: {
            opposite_meaning: "Worldly",
            opposite_cards: ["The Hermit", "The Emperor", "Justice"],
        },
        Guidance: {
            opposite_meaning: "Independence",
            opposite_cards: ["The Magician", "The High Priestess", "The Moon"],
        },
        Dogma: {
            opposite_meaning: "Freedom",
            opposite_cards: ["The Hanged Man", "The Star", "The Sun"],
        },
    },
    "The Lovers": {
        Love: {
            opposite_meaning: "Discord",
            opposite_cards: ["The Devil", "The Tower", "The Moon"],
        },
        Connection: {
            opposite_meaning: "Separation",
            opposite_cards: ["The Emperor", "The Chariot", "The Fool"],
        },
        Union: {
            opposite_meaning: "Division",
            opposite_cards: ["The Magician", "The Empress", "The Hermit"],
        },
        Harmony: {
            opposite_meaning: "Conflict",
            opposite_cards: ["The High Priestess", "The Hanged Man", "Justice"],
        },
        Passion: {
            opposite_meaning: "Apathy",
            opposite_cards: ["The Star", "The Sun", "The Tower"],
        },
    },
    "The Chariot": {
        Determination: {
            opposite_meaning: "Hesitation",
            opposite_cards: ["The Fool", "The Hanged Man", "The Hermit"],
        },
        Victory: {
            opposite_meaning: "Defeat",
            opposite_cards: ["The Emperor", "Strength", "The Devil"],
        },
        Willpower: {
            opposite_meaning: "Weakness",
            opposite_cards: ["The Empress", "The High Priestess", "The Moon"],
        },
        Control: {
            opposite_meaning: "Chaos",
            opposite_cards: ["The Magician", "The Tower", "The Star"],
        },
        Progress: {
            opposite_meaning: "Stagnation",
            opposite_cards: ["The Sun", "Justice", "The Hermit"],
        },
    },
    Strength: {
        Courage: {
            opposite_meaning: "Fear",
            opposite_cards: ["The Fool", "The Tower", "The Devil"],
        },
        "Inner Strength": {
            opposite_meaning: "Weakness",
            opposite_cards: ["The Emperor", "The Hanged Man", "The Hierophant"],
        },
        Patience: {
            opposite_meaning: "Impatience",
            opposite_cards: ["The Empress", "The Chariot", "Justice"],
        },
        Endurance: {
            opposite_meaning: "Fragility",
            opposite_cards: ["The High Priestess", "The Moon", "The Hermit"],
        },
        Fortitude: {
            opposite_meaning: "Timidity",
            opposite_cards: ["The Star", "The Tower", "The Sun"],
        },
    },
    "The Hermit": {
        Solitude: {
            opposite_meaning: "Sociability",
            opposite_cards: ["The Fool", "The Lovers", "The Devil"],
        },
        Reflection: {
            opposite_meaning: "Distraction",
            opposite_cards: ["The Emperor", "The Chariot", "The Hierophant"],
        },
        Wisdom: {
            opposite_meaning: "Ignorance",
            opposite_cards: ["The Empress", "The High Priestess", "Justice"],
        },
        Guidance: {
            opposite_meaning: "Confusion",
            opposite_cards: ["The Magician", "The Tower", "The Moon"],
        },
        Retreat: {
            opposite_meaning: "Engagement",
            opposite_cards: ["The Sun", "Strength", "The Devil"],
        },
    },
    "Wheel of Fortune": {
        Destiny: {
            opposite_meaning: "Chance",
            opposite_cards: ["The Fool", "The Tower", "The Devil"],
        },
        Change: {
            opposite_meaning: "Stability",
            opposite_cards: ["The Emperor", "The Chariot", "The Hermit"],
        },
        Luck: {
            opposite_meaning: "Misfortune",
            opposite_cards: ["The Empress", "The High Priestess", "Justice"],
        },
        Cycles: {
            opposite_meaning: "Stagnation",
            opposite_cards: ["The Magician", "The Sun", "The Moon"],
        },
        Fate: {
            opposite_meaning: "Free Will",
            opposite_cards: ["Strength", "The Hanged Man", "The Star"],
        },
    },
    Justice: {
        Fairness: {
            opposite_meaning: "Injustice",
            opposite_cards: ["The Fool", "The Lovers", "The Devil"],
        },
        Balance: {
            opposite_meaning: "Imbalance",
            opposite_cards: ["The Emperor", "The Chariot", "The Hermit"],
        },
        Equity: {
            opposite_meaning: "Bias",
            opposite_cards: ["The Empress", "The High Priestess", "The Moon"],
        },
        Morality: {
            opposite_meaning: "Corruption",
            opposite_cards: ["The Magician", "The Tower", "The Sun"],
        },
        Truth: {
            opposite_meaning: "Deception",
            opposite_cards: ["Strength", "The Hanged Man", "The Star"],
        },
    },
    "The Hanged Man": {
        Surrender: {
            opposite_meaning: "Resistance",
            opposite_cards: ["The Fool", "The Lovers", "The Devil"],
        },
        Suspension: {
            opposite_meaning: "Action",
            opposite_cards: ["The Emperor", "The Chariot", "The Hermit"],
        },
        Enlightenment: {
            opposite_meaning: "Ignorance",
            opposite_cards: ["The Empress", "The High Priestess", "The Moon"],
        },
        Sacrifice: {
            opposite_meaning: "Selfishness",
            opposite_cards: ["The Magician", "The Tower", "The Sun"],
        },
        Perspective: {
            opposite_meaning: "Narrowness",
            opposite_cards: ["Wheel of Fortune", "Justice", "The Star"],
        },
    },
    Death: {
        Transformation: {
            opposite_meaning: "Stagnation",
            opposite_cards: ["The Fool", "The Lovers", "The Devil"],
        },
        Endings: {
            opposite_meaning: "Beginnings",
            opposite_cards: ["The Emperor", "The Chariot", "The Hermit"],
        },
        Rebirth: {
            opposite_meaning: "Decay",
            opposite_cards: ["The Empress", "The High Priestess", "The Moon"],
        },
        Change: {
            opposite_meaning: "Permanence",
            opposite_cards: ["The Magician", "The Tower", "The Sun"],
        },
        Closure: {
            opposite_meaning: "Continuation",
            opposite_cards: ["Wheel of Fortune", "Justice", "The Star"],
        },
    },
    Temperance: {
        Balance: {
            opposite_meaning: "Imbalance",
            opposite_cards: ["The Fool", "The Lovers", "The Devil"],
        },
        Harmony: {
            opposite_meaning: "Discord",
            opposite_cards: ["The Emperor", "The Chariot", "The Hermit"],
        },
        Moderation: {
            opposite_meaning: "Excess",
            opposite_cards: ["The Empress", "The High Priestess", "The Moon"],
        },
        Patience: {
            opposite_meaning: "Impatience",
            opposite_cards: ["The Magician", "The Tower", "The Sun"],
        },
        Integration: {
            opposite_meaning: "Separation",
            opposite_cards: ["Wheel of Fortune", "Justice", "The Star"],
        },
    },
    "The Devil": {
        Temptation: {
            opposite_meaning: "Virtue",
            opposite_cards: ["The Fool", "The Lovers", "The Star"],
        },
        Materialism: {
            opposite_meaning: "Spirituality",
            opposite_cards: ["The Emperor", "The High Priestess", "The Sun"],
        },
        Bondage: {
            opposite_meaning: "Freedom",
            opposite_cards: ["Strength", "The Hanged Man", "The Moon"],
        },
        Desire: {
            opposite_meaning: "Detachment",
            opposite_cards: ["Temperance", "Justice", "The Hermit"],
        },
        Corruption: {
            opposite_meaning: "Purity",
            opposite_cards: ["Wheel of Fortune", "Death", "The Chariot"],
        },
    },
    "The Tower": {
        Catastrophe: {
            opposite_meaning: "Stability",
            opposite_cards: ["The Fool", "The Lovers", "The Sun"],
        },
        Destruction: {
            opposite_meaning: "Preservation",
            opposite_cards: ["The Emperor", "The High Priestess", "The Star"],
        },
        "Sudden Change": {
            opposite_meaning: "Predictability",
            opposite_cards: ["Strength", "The Hanged Man", "The Moon"],
        },
        Chaos: {
            opposite_meaning: "Order",
            opposite_cards: ["Temperance", "Justice", "The Hermit"],
        },
        Upheaval: {
            opposite_meaning: "Security",
            opposite_cards: ["Wheel of Fortune", "Death", "The Chariot"],
        },
    },
    "The Star": {
        Hope: {
            opposite_meaning: "Despair",
            opposite_cards: ["The Fool", "The Lovers", "The Devil"],
        },
        Inspiration: {
            opposite_meaning: "Mundanity",
            opposite_cards: ["The Emperor", "The Chariot", "The Hermit"],
        },
        Guidance: {
            opposite_meaning: "Confusion",
            opposite_cards: ["Strength", "The Hanged Man", "The Moon"],
        },
        Optimism: {
            opposite_meaning: "Pessimism",
            opposite_cards: ["Temperance", "Justice", "The Sun"],
        },
        Healing: {
            opposite_meaning: "Suffering",
            opposite_cards: ["Wheel of Fortune", "Death", "The Tower"],
        },
    },
    "The Moon": {
        Illusion: {
            opposite_meaning: "Reality",
            opposite_cards: ["The Fool", "The Lovers", "The Star"],
        },
        Mystery: {
            opposite_meaning: "Clarity",
            opposite_cards: ["The Emperor", "The High Priestess", "The Sun"],
        },
        Subconscious: {
            opposite_meaning: "Conscious",
            opposite_cards: ["Strength", "The Hanged Man", "The Devil"],
        },
        Confusion: {
            opposite_meaning: "Certainty",
            opposite_cards: ["Temperance", "Justice", "The Chariot"],
        },
        Deception: {
            opposite_meaning: "Truth",
            opposite_cards: ["Wheel of Fortune", "Death", "The Tower"],
        },
    },
    "The Sun": {
        Joy: {
            opposite_meaning: "Despair",
            opposite_cards: ["The Fool", "The Lovers", "The Devil"],
        },
        Success: {
            opposite_meaning: "Failure",
            opposite_cards: ["The Emperor", "The Chariot", "The Hermit"],
        },
        Radiance: {
            opposite_meaning: "Darkness",
            opposite_cards: ["Strength", "The Hanged Man", "The Moon"],
        },
        Clarity: {
            opposite_meaning: "Obscurity",
            opposite_cards: ["Temperance", "Justice", "The Star"],
        },
        Happiness: {
            opposite_meaning: "Sorrow",
            opposite_cards: ["Wheel of Fortune", "Death", "The Tower"],
        },
    },
    Judgement: {
        Reckoning: {
            opposite_meaning: "Forgiveness",
            opposite_cards: ["The Fool", "The Lovers", "The Devil"],
        },
        Redemption: {
            opposite_meaning: "Condemnation",
            opposite_cards: ["The Emperor", "The Chariot", "The Hermit"],
        },
        Renewal: {
            opposite_meaning: "Stagnation",
            opposite_cards: ["Strength", "The Hanged Man", "The Moon"],
        },
        Awakening: {
            opposite_meaning: "Ignorance",
            opposite_cards: ["Temperance", "Justice", "The Sun"],
        },
        Judgement: {
            opposite_meaning: "Mercy",
            opposite_cards: ["Wheel of Fortune", "Death", "The Tower"],
        },
    },
    "The World": {
        Completion: {
            opposite_meaning: "Incompletion",
            opposite_cards: ["The Fool", "The Lovers", "The Devil"],
        },
        Fulfillment: {
            opposite_meaning: "Dissatisfaction",
            opposite_cards: ["The Emperor", "The Chariot", "The Hermit"],
        },
        Wholeness: {
            opposite_meaning: "Fragmentation",
            opposite_cards: ["Strength", "The Hanged Man", "The Moon"],
        },
        Achievement: {
            opposite_meaning: "Failure",
            opposite_cards: ["Temperance", "Justice", "The Sun"],
        },
        Integration: {
            opposite_meaning: "Disconnection",
            opposite_cards: ["Wheel of Fortune", "Death", "The Tower"],
        },
    },
};

export default openAi;
