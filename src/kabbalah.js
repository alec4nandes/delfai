const kabbalah = {
    Fool: {
        letter: "א",
        element: "Air",
    },
    Magician: {
        letter: "ב",
        astro: "Mercury",
    },
    "High Priestess": {
        letter: "ג",
        astro: "Moon",
    },
    Empress: {
        letter: "ד",
        astro: "Venus",
    },
    Emperor: {
        letter: "ה",
        zodiac: {
            sign: "Aries",
            start_date: "3/21",
            end_date: "4/20",
        },
    },
    Hierophant: {
        letter: "ו",
        zodiac: {
            sign: "Taurus",
            start_date: "4/21",
            end_date: "5/20",
        },
    },
    Lovers: {
        letter: "ז",
        zodiac: {
            sign: "Gemini",
            start_date: "5/21",
            end_date: "6/20",
        },
    },
    Chariot: {
        letter: "ח",
        zodiac: {
            sign: "Cancer",
            start_date: "6/21",
            end_date: "7/21",
        },
    },
    Strength: {
        letter: "ט",
        zodiac: {
            sign: "Leo",
            start_date: "7/22",
            end_date: "8/22",
        },
    },
    Hermit: {
        letter: "י",
        zodiac: {
            sign: "Virgo",
            start_date: "8/23",
            end_date: "9/22",
        },
    },
    "Wheel of Fortune": {
        letter: "כ",
        astro: "Jupiter",
    },
    Justice: {
        letter: "ל",
        zodiac: {
            sign: "Libra",
            start_date: "9/23",
            end_date: "10/22",
        },
    },
    "Hanged Man": {
        letter: "מ",
        element: "Water",
    },
    Death: {
        letter: "נ",
        zodiac: {
            sign: "Scorpio",
            start_date: "10/23",
            end_date: "11/22",
        },
    },
    Temperance: {
        letter: "ס",
        zodiac: {
            sign: "Sagittarius",
            start_date: "11/23",
            end_date: "12/21",
        },
    },
    Devil: {
        letter: "ע",
        zodiac: {
            sign: "Capricorn",
            start_date: "12/22",
            end_date: "1/19",
        },
    },
    Tower: {
        letter: "פ",
        astro: "Mars",
    },
    Star: {
        letter: "צ",
        zodiac: {
            sign: "Aquarius",
            start_date: "1/20",
            end_date: "2/18",
        },
    },
    Moon: {
        letter: "ק",
        zodiac: {
            sign: "Pisces",
            start_date: "2/19",
            end_date: "3/20",
        },
    },
    Sun: {
        letter: "ר",
        astro: "Sun",
    },
    Judgement: {
        letter: "ש",
        element: "Fire",
    },
    World: {
        letter: "ת",
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
    Queen: { world: "Creative Word (Briah)" },
    King: { world: "Archetypal World (Atziluth)" },
};

const suits = {
    Pentacles: { element: "Earth", ...sefirot.Page },
    Swords: { element: "Air", ...sefirot.Knight },
    Cups: { element: "Water", ...sefirot.Queen },
    Wands: { element: "Fire", ...sefirot.King },
};

export { kabbalah, sefirot, suits };
