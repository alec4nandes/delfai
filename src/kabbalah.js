const kabbalah = {
    Fool: {
        letter: "א",
        translate: "aleph",
        element: "Air",
    },
    Magician: {
        letter: "ב",
        translate: "beth",
        astro: "Mercury",
    },
    "High Priestess": {
        letter: "ג",
        translate: "gimmel",
        astro: "Moon",
    },
    Empress: {
        letter: "ד",
        translate: "daleth",
        astro: "Venus",
    },
    Emperor: {
        letter: "ה",
        translate: "heh",
        zodiac: {
            sign: "Aries",
            start_date: "3/21",
            end_date: "4/20",
        },
    },
    Hierophant: {
        letter: "ו",
        translate: "vav",
        zodiac: {
            sign: "Taurus",
            start_date: "4/21",
            end_date: "5/20",
        },
    },
    Lovers: {
        letter: "ז",
        translate: "zayn",
        zodiac: {
            sign: "Gemini",
            start_date: "5/21",
            end_date: "6/20",
        },
    },
    Chariot: {
        letter: "ח",
        translate: "chet",
        zodiac: {
            sign: "Cancer",
            start_date: "6/21",
            end_date: "7/21",
        },
    },
    Strength: {
        letter: "ט",
        translate: "teth",
        zodiac: {
            sign: "Leo",
            start_date: "7/22",
            end_date: "8/22",
        },
    },
    Hermit: {
        letter: "י",
        translate: "yod",
        zodiac: {
            sign: "Virgo",
            start_date: "8/23",
            end_date: "9/22",
        },
    },
    "Wheel of Fortune": {
        letter: "כ",
        translate: "kaph",
        astro: "Jupiter",
    },
    Justice: {
        letter: "ל",
        translate: "lamed",
        zodiac: {
            sign: "Libra",
            start_date: "9/23",
            end_date: "10/22",
        },
    },
    "Hanged Man": {
        letter: "מ",
        translate: "mem",
        element: "Water",
    },
    Death: {
        letter: "נ",
        translate: "nun",
        zodiac: {
            sign: "Scorpio",
            start_date: "10/23",
            end_date: "11/22",
        },
    },
    Temperance: {
        letter: "ס",
        translate: "samekh",
        zodiac: {
            sign: "Sagittarius",
            start_date: "11/23",
            end_date: "12/21",
        },
    },
    Devil: {
        letter: "ע",
        translate: "ayin",
        zodiac: {
            sign: "Capricorn",
            start_date: "12/22",
            end_date: "1/19",
        },
    },
    Tower: {
        letter: "פ",
        translate: "peh",
        astro: "Mars",
    },
    Star: {
        letter: "צ",
        translate: "tzaddi",
        zodiac: {
            sign: "Aquarius",
            start_date: "1/20",
            end_date: "2/18",
        },
    },
    Moon: {
        letter: "ק",
        translate: "koph",
        zodiac: {
            sign: "Pisces",
            start_date: "2/19",
            end_date: "3/20",
        },
    },
    Sun: {
        letter: "ר",
        translate: "rosh",
        astro: "Sun",
    },
    Judgement: {
        letter: "ש",
        translate: "shin",
        element: "Fire",
    },
    World: {
        letter: "ת",
        translate: "tav",
        astro: "Saturn",
    },
};

const sefirot = {
    Ace: { sefira: "Kether" },
    2: { sefira: "Chokmah" },
    3: { sefira: "Binah" },
    4: { sefira: "Chesed" },
    5: { sefira: "Geburah" },
    6: { sefira: "Tiphareth" },
    7: { sefira: "Netzach" },
    8: { sefira: "Hod" },
    9: { sefira: "Yesod" },
    10: { sefira: "Malkuth" },
    Page: { world: "Material World (Assiah)" },
    Knight: { world: "Formative World (Yetzirah)" },
    Queen: { world: "Creative World (Briah)" },
    King: { world: "Archetypal World (Atziluth)" },
};

const suits = {
    Pentacles: { element: "Earth", ...sefirot.Page },
    Swords: { element: "Air", ...sefirot.Knight },
    Cups: { element: "Water", ...sefirot.Queen },
    Wands: { element: "Fire", ...sefirot.King },
};

export { kabbalah, sefirot, suits };
