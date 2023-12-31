/*

OPENAI CHATGPT PROMPTS:

Flatten and alphabetize the following array, then display it
in plain text:
* flatten opposites, then in new chat window paste flat list

...

I would like you to go through each tarot card in the major arcana.
Using ONLY the provided list, go through each word and filter out any
that do not apply to the current card. Take the remaining words and
assign them as an array to the card's name in a JSON object. Do not
use the word "The" or any numbers in the card's name. It is important
that each array only has words from the provided list. Do not
provide any synonyms, do not change the word's grammar or tense, and
do not draw words for the cards from other sources.

...

Remember, by provided list I mean the list I first pasted into the chat.
You seem to be straying from the list. Only use those words, and
no synonyms. Give it another try.

...

Can you do the same thing for the [SUIT] suit of the minor arcana?
Write the card names with digits instead of spelling out numbers.

...

* I ended up with words from outside the list on my final try, but I
* don't mind it. I think they work, and each card should have at least
* a few words from the opposites list. Lesson: Chat GPT can be finicky.

* 9/20/23: adding words and opposites from old Tarot project
    * remove all words from cards that don't appear with at least
    * one other card or on the opposites list

*/

const opposites = [
    ["abundance", "scarcity"],
    ["acceleration", ""],
    ["accomplishment", "failure"],
    ["action", "complacent"],
    ["action", "inaction"],
    ["action", "waiting"],
    ["active", "passive"],
    ["active", "yin"],
    ["adaptability", ""],
    ["agreement", "conflict"],
    ["ambition", "complacency"],
    ["anxiety", "contentment"],
    ["apathy", "curiosity"],
    ["apathy", "emotion"],
    ["arrival", "departure"],
    ["balance", "chaos"],
    ["balance", "imbalance"],
    ["beginning", "ending"],
    ["belief", "loss of faith"],
    ["betrayal", "loyalty"],
    ["blindness", "foresight"],
    ["bondage", "freedom"],
    ["boundaries", "unrestricted"],
    ["bravery", "fear"],
    ["breakthrough", "stagnation"],
    ["burden", "lightness"],
    ["calm", "shock"],
    ["carelessness", "responsibility"],
    ["celebration", "mourning"],
    ["challenges", "ease"],
    ["change", "stability"],
    ["chaos", "control"],
    ["chaos", "peace"],
    ["chaos", "serenity"],
    ["charisma", "dullness"],
    ["charm", "repulsion"],
    ["charming", "repulsive"],
    ["clarity", "confusion"],
    ["clarity", "mystery"],
    ["cold", "warmth"],
    ["collaboration", "solitude"],
    ["companionship", "solitude"],
    ["compassion", "cruelty"],
    ["competition", "cooperation"],
    ["completion", "incompletion"],
    ["conformity", "individuality"],
    ["conformity", "rebellion"],
    ["confusion", "guidance"],
    ["connection", "disconnection"],
    ["conscious mind", "unconscious mind"],
    ["contentment", "dissatisfaction"],
    ["contraction", "expansion"],
    ["control", "loss of control"],
    ["courage", "fear"],
    ["creative", "uncreative"],
    ["creativity", "uncreativity"],
    ["deadlock", "movement"],
    ["deception", "honesty"],
    ["decision", "indecision"],
    ["defeat", "victory"],
    ["dependence", "independence"],
    ["dependency", "self-sufficiency"],
    ["desengagement", "engagement"],
    ["desire", "disinterest"],
    ["destiny", "randomness"],
    ["deterioration", "renewal"],
    ["determination", "hesitation"],
    ["diligence", "neglect"],
    ["direct", "indirect"],
    ["disappointment", "satisfaction"],
    ["discord", "harmony"],
    ["dishonesty", "honesty"],
    ["dissatisfaction", "joy"],
    ["dissonance", "harmony"],
    ["division", "unity"],
    ["drama", "peace"],
    ["dream", "nightmare"],
    ["dream", "reality"],
    ["ease", "effort"],
    ["ease", "hardship"],
    ["emptiness", "fulfillment"],
    ["engagement", "withdrawal"],
    ["enlightenment", "ignorance"],
    ["equity", "injustice"],
    ["expansion", "restriction"],
    ["experience", "inexperience"],
    ["failure", "success"],
    ["fairness", "unfairness"],
    ["faith", "loss of faith"],
    ["falsehood", "truth"],
    ["fate", "free will"],
    ["feeling", "numbness"],
    ["femininity", "masculinity"],
    ["flexibility", "rigidity"],
    ["followership", "leadership"],
    ["fortitude", "weakness"],
    ["forward-looking", "nostalgia"],
    ["fragility", "resilience"],
    ["freedom", "imprisonment"],
    ["frigidity", "sensuality"],
    ["gain", "loss"],
    ["generosity", "greed"],
    ["generosity", "possessiveness"],
    ["generosity", "selfishness"],
    ["grief", "happiness"],
    ["happiness", "heartbreak"],
    ["happiness", "sadness"],
    ["hatred", "love"],
    ["healing", "hurt"],
    ["healthy", "weak"],
    ["hope", "hopelessness"],
    ["ignorance", "inquiry"],
    ["illness", "recovery"],
    ["illusion", "reality"],
    ["impatience", "patience"],
    ["improvisation", "planning"],
    ["incompetence", "mastery"],
    ["indifference", "interest"],
    ["indifference", "passion"],
    ["innovation", "tradition"],
    ["insecurity", "security"],
    ["inspiration", "uninspired"],
    ["intuition", "reason"],
    ["irrationality", "rationality"],
    ["irresponsibility", "responsibility"],
    ["isolation", "togetherness"],
    ["journey", "staying put"],
    ["joy", "sorrow"],
    ["justice", "unfairness"],
    ["laziness", "work"],
    ["lethargy", "vitality"],
    ["luck", "misfortune"],
    ["materialism", "spirituality"],
    ["maternal", "paternal"],
    ["movement", "stagnation"],
    ["narrowness", "perspective"],
    ["negative", "positive"],
    ["neglect", "nurturing"],
    ["new", "old"],
    ["nonphysical conquest", "physical conquest"],
    ["obscurity", "recognition"],
    ["optimism", "pessimism"],
    ["pain", "pleasure"],
    ["passive", "yang"],
    ["peace", "struggle"],
    ["poverty", "prosperity"],
    ["poverty", "wealth"],
    ["power", "weakness"],
    ["predictability", "spontaneity"],
    ["relationship", "solitude"],
    ["resistance", "surrender"],
    ["resistance", "temptation"],
    ["revelation", "secrecy"],
    ["risk", "safety"],
    ["secrets", "transparency"],
    ["self-confidence", "self-doubt"],
    ["serenity", "struggle"],
    ["sleep", "sleeplessness"],
    ["stability", "upheaval"],
    ["stagnation", "transformation"],
    ["strength", "weakness"],
    ["thrift", "waste"],
    ["tranquility", "worry"],
    ["yang", "yin"],
];

const allCards = {
    Fool: [
        "beginning",
        "carelessness",
        "creativity",
        "curiosity",
        "freedom",
        "ignorance",
        "inexperience",
        "innocence",
        "innovation",
        "potential",
        "spontaneity",
    ],
    Magician: [
        "action",
        "active",
        "concentration",
        "confidence",
        "conscious mind",
        "control",
        "creative",
        "innovation",
        "inspiration",
        "power",
        "skill",
        "talent",
        "transformation",
        "yang",
    ],
    "High Priestess": [
        "intuition",
        "meditation",
        "mystery",
        "passive",
        "potential",
        "reflection",
        "secrecy",
        "secret",
        "secrets",
        "solitude",
        "spiritual connection",
        "tranquility",
        "unconscious mind",
        "yin",
    ],
    Empress: [
        "abundance",
        "beauty",
        "creativity",
        "desire",
        "femininity",
        "fertility",
        "gentleness",
        "love",
        "maternal",
        "nurturing",
        "pleasure",
        "protection",
    ],
    Emperor: [
        "authority",
        "control",
        "determination",
        "experience",
        "hierarchy",
        "leadership",
        "masculinity",
        "paternal",
        "power",
        "rationality",
        "responsibility",
        "rule",
        "stability",
        "strength",
    ],
    Hierophant: [
        "belief",
        "conformity",
        "faith",
        "guidance",
        "hierarchy",
        "spiritual connection",
        "spirituality",
        "tradition",
        "unity",
    ],
    Lovers: [
        "choice",
        "connection",
        "desire",
        "harmony",
        "love",
        "passion",
        "pleasure",
        "relationship",
        "self-confidence",
        "union",
    ],
    Chariot: [
        "bravery",
        "control",
        "courage",
        "determination",
        "movement",
        "physical conquest",
        "success",
        "traveling",
        "victory",
        "willpower",
    ],
    Strength: [
        "bravery",
        "composure",
        "confidence",
        "courage",
        "determination",
        "endurance",
        "energy",
        "gentleness",
        "health",
        "nonphysical conquest",
        "patience",
        "power",
        "strength",
        "vitality",
    ],
    Hermit: [
        "contemplation",
        "enlightenment",
        "guidance",
        "introspection",
        "isolation",
        "meditation",
        "patience",
        "reflection",
        "self-sufficiency",
        "solitude",
        "wisdom",
    ],
    "Wheel of Fortune": [
        "change",
        "luck",
        "movement",
        "opportunity",
        "potential",
        "randomness",
        "transition",
        "turning point",
        "unstoppable change",
        "vision",
    ],
    Justice: [
        "balance",
        "cause-and-effect",
        "clarity",
        "decision",
        "equity",
        "fairness",
        "honesty",
        "justice",
        "rationality",
        "reflection",
        "responsibility",
        "rule",
        "truth",
    ],
    "Hanged Man": [
        "change",
        "meditation",
        "perspective",
        "punishment",
        "reflection",
        "release",
        "restriction",
        "sacrifice",
        "surrender",
        "transformation",
        "wait",
        "waiting",
    ],
    Death: [
        "change",
        "ending",
        "endings",
        "loss",
        "mystery",
        "release",
        "renewal",
        "transformation",
        "transition",
        "turning point",
        "unstoppable change",
    ],
    Temperance: [
        "adaptability",
        "adaptation",
        "balance",
        "compromise",
        "cooperation",
        "harmony",
        "healing",
        "health",
        "integration",
        "patience",
    ],
    Devil: [
        "bondage",
        "deception",
        "desire",
        "greed",
        "hopelessness",
        "ignorance",
        "illusion",
        "loss of control",
        "loss of faith",
        "materialism",
        "selfishness",
        "temptation",
        "weakness",
    ],
    Tower: [
        "change",
        "chaos",
        "crisis",
        "disaster",
        "disruption",
        "punishment",
        "release",
        "revelation",
        "separation",
        "transformation",
        "upheaval",
    ],
    Star: [
        "beauty",
        "clarity",
        "faith",
        "generosity",
        "guidance",
        "healing",
        "hope",
        "illumination",
        "inspiration",
        "peace",
        "reflection",
        "renewal",
        "serenity",
        "vitality",
    ],
    Moon: [
        "confusion",
        "deception",
        "dream",
        "emotion",
        "fear",
        "illusion",
        "imagination",
        "intuition",
        "mystery",
        "reflection",
        "secrets",
        "unconscious mind",
    ],
    Sun: [
        "celebration",
        "clarity",
        "energy",
        "enlightenment",
        "generosity",
        "growth",
        "happiness",
        "illumination",
        "joy",
        "success",
        "vitality",
        "warmth",
    ],
    Judgement: [
        "cause-and-effect",
        "recognition",
        "reflection",
        "release",
        "renewal",
        "revelation",
        "transformation",
    ],
    World: [
        "accomplishment",
        "achievement",
        "completion",
        "ending",
        "enlightenment",
        "freedom",
        "fulfillment",
        "integration",
        "success",
        "unity",
    ],
    "Ace of Wands": [
        "adventure",
        "beginning",
        "creative urge",
        "creativity",
        "desire",
        "energy",
        "inspiration",
        "intellect",
        "passion",
        "potential",
        "strength",
        "vision",
    ],
    "2 of Wands": [
        "ambition",
        "balance",
        "choice",
        "curiosity",
        "decision",
        "desire",
        "drive",
        "duality",
        "energy",
        "enthusiasm",
        "expectation",
        "exploration",
        "force",
        "foresight",
        "plan",
        "planning",
        "progress",
        "project",
        "risk",
        "search",
        "yearning",
    ],
    "3 of Wands": [
        "action",
        "attention",
        "business",
        "care",
        "community",
        "concept",
        "contemplation",
        "creativity",
        "effort",
        "expansion",
        "exploration",
        "flux",
        "foresight",
        "growth",
        "help",
        "hope",
        "opportunity",
        "optimism",
        "outcome",
        "patience",
        "prosperity",
        "trade",
        "wait",
    ],
    "4 of Wands": [
        "achievement",
        "celebration",
        "completion",
        "expansion",
        "freedom",
        "happiness",
        "harmony",
        "joy",
        "outcome",
        "peace",
        "possession",
        "prosperity",
        "serenity",
        "stability",
        "unity",
    ],
    "5 of Wands": [
        "action",
        "adversity",
        "challenge",
        "change",
        "chaos",
        "competition",
        "conflict",
        "effort",
        "energy",
        "restriction",
        "struggle",
    ],
    "6 of Wands": [
        "accomplishment",
        "achievement",
        "announcement",
        "arrival",
        "balance",
        "confidence",
        "growth",
        "harmony",
        "illumination",
        "journey",
        "message",
        "recognition",
        "success",
        "victory",
    ],
    "7 of Wands": [
        "challenge",
        "challenges",
        "competition",
        "confidence",
        "courage",
        "creativity",
        "defense",
        "determination",
        "faith",
        "inspiration",
        "opposition",
        "perseverance",
        "resistance",
        "self-confidence",
        "struggle",
        "willpower",
    ],
    "8 of Wands": [
        "action",
        "announcement",
        "change",
        "communication",
        "decision",
        "logic",
        "message",
        "movement",
        "option",
        "progress",
        "speed",
        "strength",
        "travel",
        "traveling",
    ],
    "9 of Wands": [
        "adventure",
        "arrival",
        "defense",
        "determination",
        "endurance",
        "experience",
        "fruition",
        "fulfillment",
        "integration",
        "obstacle",
        "opposition",
        "perseverance",
        "potential",
        "rationality",
        "resilience",
        "risk",
        "strength",
        "transformation",
        "work",
    ],
    "10 of Wands": [
        "burden",
        "challenge",
        "completion",
        "culmination",
        "ending",
        "hard work",
        "manifestation",
        "overwhelming",
        "responsibility",
        "strength",
        "struggle",
        "work",
    ],
    "Page of Wands": [
        "adventure",
        "commitment",
        "creativity",
        "curiosity",
        "enthusiasm",
        "exploration",
        "friendship",
        "impetuous",
        "insight",
        "inspiration",
        "learning",
        "love",
        "loyalty",
        "support",
        "travel",
        "vitality",
    ],
    "Knight of Wands": [
        "action",
        "adventure",
        "ambition",
        "capability",
        "chivalry",
        "courage",
        "determination",
        "enterprising",
        "enthusiasm",
        "exploration",
        "foresight",
        "formation",
        "idealism",
        "impatience",
        "impetuous",
        "intellect",
        "opportunity",
        "optimism",
        "passion",
        "travel",
    ],
    "Queen of Wands": [
        "autonomy",
        "charisma",
        "concept",
        "confidence",
        "determination",
        "dominance",
        "independence",
        "influence",
        "leadership",
        "passion",
        "power",
        "satisfaction",
        "self-confidence",
        "strength",
    ],
    "King of Wands": [
        "ambition",
        "authority",
        "confidence",
        "creative urge",
        "dominance",
        "entrepreneur",
        "experience",
        "inspiration",
        "leadership",
        "security",
        "stability",
        "strength",
        "vision",
    ],
    "Ace of Cups": [
        "abundance",
        "adaptation",
        "beginning",
        "care",
        "compassion",
        "creative urge",
        "emotion",
        "feeling",
        "fertility",
        "healing",
        "intuition",
        "joy",
        "love",
        "openness",
        "opportunity",
        "potential",
        "romance",
        "unconscious mind",
    ],
    "2 of Cups": [
        "agreement",
        "attraction",
        "balance",
        "connection",
        "decision",
        "duality",
        "force",
        "friendship",
        "harmony",
        "joy",
        "love",
        "passion",
        "relationship",
        "sympathy",
        "understanding",
        "union",
        "unity",
    ],
    "3 of Cups": [
        "celebration",
        "collaboration",
        "comfort",
        "community",
        "concept",
        "dance",
        "flux",
        "friendship",
        "happiness",
        "health",
        "joy",
        "outcome",
        "sharing",
        "teamwork",
        "victory",
        "work",
    ],
    "4 of Cups": [
        "apathy",
        "complacency",
        "contemplation",
        "disappointment",
        "dissatisfaction",
        "emotion",
        "expansion",
        "expectation",
        "habit",
        "introspection",
        "outcome",
        "possession",
        "reflection",
        "refusal",
        "stability",
    ],
    "5 of Cups": [
        "adversity",
        "change",
        "despair",
        "difficulty",
        "disappointment",
        "emotion",
        "fear",
        "grief",
        "guilt",
        "loss",
        "pessimism",
        "reflection",
        "refusal",
        "regret",
        "restriction",
        "sacrifice",
        "sadness",
        "sorrow",
    ],
    "6 of Cups": [
        "balance",
        "connection",
        "exchange",
        "friendship",
        "gift",
        "growth",
        "home",
        "illumination",
        "innocence",
        "journey",
        "joy",
        "message",
        "nostalgia",
        "offer",
        "passion",
        "peace",
        "romance",
        "safety",
        "sharing",
        "yearning",
    ],
    "7 of Cups": [
        "challenge",
        "choice",
        "confusion",
        "creativity",
        "deception",
        "desire",
        "dream",
        "faith",
        "illusion",
        "imagination",
        "indecision",
        "option",
        "temptation",
        "vision",
        "willpower",
    ],
    "8 of Cups": [
        "adventure",
        "change",
        "departure",
        "emotion",
        "exploration",
        "freedom",
        "journey",
        "logic",
        "loneliness",
        "movement",
        "moving on",
        "progress",
        "rejection",
        "search",
        "strength",
        "transition",
        "travel",
    ],
    "9 of Cups": [
        "abundance",
        "affection",
        "contentment",
        "fruition",
        "fulfillment",
        "happiness",
        "joy",
        "pleasure",
        "potential",
        "satisfaction",
        "sensuality",
        "success",
        "transformation",
    ],
    "10 of Cups": [
        "celebration",
        "commitment",
        "community",
        "completion",
        "contentment",
        "culmination",
        "emotion",
        "ending",
        "family",
        "friendship",
        "fulfillment",
        "happiness",
        "harmony",
        "joy",
        "manifestation",
        "peace",
        "rest",
        "success",
    ],
    "Page of Cups": [
        "compassion",
        "contemplation",
        "creativity",
        "curiosity",
        "dream",
        "emotion",
        "enthusiasm",
        "friendship",
        "grace",
        "insight",
        "inspiration",
        "intuition",
        "joy",
        "openness",
        "perception",
        "potential",
        "presence",
        "romance",
        "sensitivity",
        "sweetness",
    ],
    "Knight of Cups": [
        "action",
        "charm",
        "compassion",
        "creativity",
        "determination",
        "emotion",
        "formation",
        "idealism",
        "imagination",
        "insight",
        "inspiration",
        "introspection",
        "opportunity",
        "pleasure",
        "reflection",
        "romance",
        "sensitivity",
        "temperamental",
        "warmth",
    ],
    "Queen of Cups": [
        "affection",
        "attraction",
        "charm",
        "compassion",
        "concept",
        "emotion",
        "empathy",
        "influence",
        "intuition",
        "love",
        "mystery",
        "nurturing",
        "reflection",
        "satisfaction",
        "sensitivity",
        "support",
        "sweetness",
        "sympathy",
        "tranquility",
        "understanding",
        "warmth",
    ],
    "King of Cups": [
        "affection",
        "attraction",
        "authority",
        "balance",
        "charm",
        "chivalry",
        "compassion",
        "composure",
        "cooperation",
        "creative urge",
        "emotion",
        "empathy",
        "grace",
        "intuition",
        "joy",
        "leadership",
        "love",
        "loyalty",
        "protection",
        "stability",
        "subtlety",
        "sympathy",
        "wisdom",
    ],
    "Ace of Swords": [
        "accomplishment",
        "anger",
        "beginning",
        "clarity",
        "creative urge",
        "determination",
        "focus",
        "insight",
        "intellect",
        "potential",
        "responsibility",
        "retribution",
        "truth",
    ],
    "2 of Swords": [
        "adaptation",
        "balance",
        "blindness",
        "blockage",
        "choice",
        "compromise",
        "contemplation",
        "decision",
        "duality",
        "force",
        "grace",
        "meditation",
        "reflection",
        "subtlety",
        "tension",
    ],
    "3 of Swords": [
        "betrayal",
        "community",
        "concept",
        "emotion",
        "flux",
        "grief",
        "guilt",
        "heartbreak",
        "loneliness",
        "loss",
        "meditation",
        "outcome",
        "pain",
        "regret",
        "rejection",
        "sadness",
        "separation",
        "sorrow",
        "suffering",
    ],
    "4 of Swords": [
        "contemplation",
        "expansion",
        "healing",
        "meditation",
        "outcome",
        "peace",
        "possession",
        "protection",
        "recovery",
        "reflection",
        "rest",
        "sleep",
        "solitude",
        "stability",
        "wait",
    ],
    "5 of Swords": [
        "adversity",
        "challenge",
        "change",
        "competition",
        "conflict",
        "cruelty",
        "defeat",
        "difficulty",
        "disruption",
        "drama",
        "failure",
        "loss",
        "restriction",
        "retribution",
        "sadness",
        "tension",
        "uncertainty",
        "unfairness",
        "weakness",
    ],
    "6 of Swords": [
        "balance",
        "change",
        "curiosity",
        "emotion",
        "exploration",
        "flux",
        "growth",
        "illumination",
        "journey",
        "movement",
        "moving on",
        "obstacle",
        "peace",
        "recovery",
        "speed",
        "transition",
        "traveling",
    ],
    "7 of Swords": [
        "betrayal",
        "challenge",
        "creativity",
        "deception",
        "defeat",
        "dishonesty",
        "faith",
        "guilt",
        "loss",
        "plan",
        "secret",
        "secrets",
        "willpower",
    ],
    "8 of Swords": [
        "betrayal",
        "bondage",
        "change",
        "confusion",
        "fear",
        "imprisonment",
        "isolation",
        "laziness",
        "logic",
        "obstacle",
        "progress",
        "restriction",
        "strength",
    ],
    "9 of Swords": [
        "anxiety",
        "crisis",
        "despair",
        "difficulty",
        "disappointment",
        "fruition",
        "fulfillment",
        "guilt",
        "loss",
        "nightmare",
        "overwhelming",
        "potential",
        "regret",
        "sadness",
        "sleeplessness",
        "suffering",
        "transformation",
        "uncertainty",
        "worry",
    ],
    "10 of Swords": [
        "betrayal",
        "blockage",
        "completion",
        "crisis",
        "culmination",
        "defeat",
        "disaster",
        "ending",
        "endings",
        "failure",
        "fear",
        "manifestation",
        "pain",
        "release",
        "sacrifice",
        "sadness",
        "suffering",
    ],
    "Page of Swords": [
        "anger",
        "attention",
        "communication",
        "curiosity",
        "dexterity",
        "energy",
        "learning",
    ],
    "Knight of Swords": [
        "action",
        "ambition",
        "anger",
        "courage",
        "determination",
        "drive",
        "focus",
        "formation",
        "impatience",
        "impetuous",
        "movement",
        "opportunity",
        "power",
        "temperamental",
    ],
    "Queen of Swords": [
        "clarity",
        "concept",
        "decision",
        "fairness",
        "honesty",
        "independence",
        "influence",
        "intellect",
        "logic",
        "organization",
        "perception",
        "power",
        "satisfaction",
        "strength",
        "wisdom",
    ],
    "King of Swords": [
        "authority",
        "calm",
        "creative urge",
        "focus",
        "guidance",
        "intellect",
        "justice",
        "leadership",
        "logic",
        "power",
        "rationality",
        "stability",
        "truth",
    ],
    "Ace of Pentacles": [
        "abundance",
        "beginning",
        "creative urge",
        "gain",
        "gift",
        "inspiration",
        "manifestation",
        "materialism",
        "opportunity",
        "potential",
        "presence",
        "prosperity",
        "success",
        "wealth",
    ],
    "2 of Pentacles": [
        "adaptability",
        "balance",
        "choice",
        "dance",
        "decision",
        "dexterity",
        "division",
        "duality",
        "financial",
        "flexibility",
        "force",
        "joy",
    ],
    "3 of Pentacles": [
        "collaboration",
        "community",
        "concept",
        "cooperation",
        "craftsmanship",
        "creativity",
        "effort",
        "flux",
        "inspiration",
        "outcome",
        "project",
        "recognition",
        "skill",
        "talent",
        "teamwork",
        "trade",
        "work",
    ],
    "4 of Pentacles": [
        "concentration",
        "conservation",
        "control",
        "determination",
        "expansion",
        "gain",
        "greed",
        "inheritance",
        "investment",
        "outcome",
        "possession",
        "possessiveness",
        "security",
        "selfishness",
        "stability",
        "thrift",
    ],
    "5 of Pentacles": [
        "adversity",
        "challenge",
        "challenges",
        "change",
        "cold",
        "despair",
        "financial",
        "hardship",
        "insecurity",
        "isolation",
        "loss",
        "obstacle",
        "poverty",
        "rejection",
        "restriction",
        "sadness",
        "struggle",
        "waste",
        "yearning",
    ],
    "6 of Pentacles": [
        "balance",
        "charity",
        "comfort",
        "fairness",
        "gain",
        "generosity",
        "gift",
        "growth",
        "help",
        "illumination",
        "journey",
        "justice",
        "offer",
        "sharing",
        "success",
        "support",
        "sympathy",
        "wealth",
    ],
    "7 of Pentacles": [
        "accomplishment",
        "business",
        "challenge",
        "charity",
        "contemplation",
        "creativity",
        "exchange",
        "expansion",
        "faith",
        "growth",
        "investment",
        "patience",
        "planning",
        "reflection",
        "waiting",
        "willpower",
    ],
    "8 of Pentacles": [
        "autonomy",
        "change",
        "commitment",
        "craftsmanship",
        "dexterity",
        "diligence",
        "habit",
        "hard work",
        "learning",
        "logic",
        "progress",
        "refinement",
        "skill",
        "strength",
    ],
    "9 of Pentacles": [
        "abundance",
        "accomplishment",
        "contentment",
        "fruition",
        "fulfillment",
        "independence",
        "investment",
        "joy",
        "potential",
        "project",
        "prosperity",
        "refinement",
        "safety",
        "self-sufficiency",
        "transformation",
    ],
    "10 of Pentacles": [
        "completion",
        "culmination",
        "ending",
        "family",
        "home",
        "inheritance",
        "manifestation",
        "materialism",
        "prosperity",
        "safety",
        "security",
        "tradition",
        "wealth",
    ],
    "Page of Pentacles": [
        "ambition",
        "curiosity",
        "dependable",
        "focus",
        "health",
        "inspiration",
        "learning",
        "potential",
        "practicality",
        "presence",
        "responsibility",
        "stability",
    ],
    "Knight of Pentacles": [
        "action",
        "determination",
        "discipline",
        "formation",
        "hard work",
        "materialism",
        "opportunity",
        "patience",
        "practicality",
        "responsibility",
        "wealth",
    ],
    "Queen of Pentacles": [
        "abundance",
        "capability",
        "care",
        "comfort",
        "compassion",
        "concept",
        "conservation",
        "generosity",
        "influence",
        "maternal",
        "nurturing",
        "organization",
        "practicality",
        "protection",
        "rationality",
        "satisfaction",
        "security",
        "sensuality",
        "warmth",
        "wealth",
    ],
    "King of Pentacles": [
        "abundance",
        "ambition",
        "authority",
        "business",
        "creative urge",
        "dependable",
        "discipline",
        "enterprising",
        "entrepreneur",
        "financial",
        "materialism",
        "practicality",
        "prosperity",
        "rationality",
        "responsibility",
        "security",
        "stability",
        "success",
        "wealth",
    ],
};

const allSuitWords = {
    Pentacles: ["health", "wealth"],
    Swords: ["learning", "logic"],
    Cups: ["connection", "emotion"],
    Wands: ["creativity", "passion"],
};

function getRankWords(rank, isReversed) {
    const cards = Object.entries(allCards)
        .filter(([cardName]) => cardName.includes(rank))
        .map(([cardName, words]) =>
            isReversed ? getCardOpposites(cardName) : words
        );
    return [
        ...new Set(
            cards
                .map((words) =>
                    words.filter((word) =>
                        cards.every((ws) => ws.includes(word))
                    )
                )
                .flat(Infinity)
        ),
    ].sort();
}

function getCardOpposites(name) {
    return [
        ...new Set(allCards[name].map(getOppositeWords).flat(Infinity)),
    ].sort();
}

function getOppositeWords(word) {
    return opposites
        .filter((pair) => pair.includes(word))
        .map((pair) => pair[pair.indexOf(word) ? 0 : 1])
        .filter(Boolean); // in case empty string in pair
}

function getRankAndSuit(cardName) {
    let [rank, suit] =
        cardName.includes(" of ") && !cardName.includes("Wheel")
            ? cardName.split(" of ")
            : [];
    suit = suit?.replace(" reversed", "");
    return { rank, suit };
}

export {
    allCards,
    opposites,
    allSuitWords,
    getRankWords,
    getCardOpposites,
    getOppositeWords,
    getRankAndSuit,
};
