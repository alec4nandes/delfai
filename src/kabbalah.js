const kabbalahMajors = {
    Fool: {
        kabbalah: {
            letter: {
                hebrew: "א",
                name: "aleph",
                gematria: 1,
            },
            tree: {
                from: "Chesed",
                to: "Geburah",
            },
        },
        element: "Air",
        symbol: "🜁",
    },
    Magician: {
        kabbalah: {
            letter: {
                hebrew: "ב",
                name: "beth",
                gematria: 2,
            },
            tree: {
                from: "Chokmah",
                to: "Chesed",
            },
        },
        astro: "Mercury",
        symbol: "☿",
    },
    "High Priestess": {
        kabbalah: {
            letter: {
                hebrew: "ג",
                name: "gimmel",
                gematria: 3,
            },
            tree: {
                from: "Binah",
                to: "Geburah",
            },
        },
        astro: "Moon",
        symbol: "☽",
    },
    Empress: {
        kabbalah: {
            letter: {
                hebrew: "ד",
                name: "daleth",
                gematria: 4,
            },
            tree: {
                from: "Kether",
                to: "Tiphareth",
            },
        },
        astro: "Venus",
        symbol: "♀",
    },
    Emperor: {
        kabbalah: {
            letter: {
                hebrew: "ה",
                name: "heh",
                gematria: 5,
            },
            tree: {
                from: "Kether",
                to: "Chokmah",
            },
        },
        zodiac: {
            sign: "Aries",
            start_date: "3/21",
            end_date: "4/20",
        },
        symbol: "♈️",
    },
    Hierophant: {
        kabbalah: {
            letter: {
                hebrew: "ו",
                name: "vav",
                gematria: 6,
            },
            tree: {
                from: "Kether",
                to: "Binah",
            },
        },
        zodiac: {
            sign: "Taurus",
            start_date: "4/21",
            end_date: "5/20",
        },
        symbol: "♉️",
    },
    Lovers: {
        kabbalah: {
            letter: {
                hebrew: "ז",
                name: "zayn",
                gematria: 7,
            },
            tree: {
                from: "Chokmah",
                to: "Geburah",
            },
        },
        zodiac: {
            sign: "Gemini",
            start_date: "5/21",
            end_date: "6/20",
        },
        symbol: "♊️",
    },
    Chariot: {
        kabbalah: {
            letter: {
                hebrew: "ח",
                name: "chet",
                gematria: 8,
            },
            tree: {
                from: "Chesed",
                to: "Tiphareth",
            },
        },
        zodiac: {
            sign: "Cancer",
            start_date: "6/21",
            end_date: "7/21",
        },
        symbol: "♋️",
    },
    Strength: {
        kabbalah: {
            letter: {
                hebrew: "ט",
                name: "teth",
                gematria: 9,
            },
            tree: {
                from: "Chokmah",
                to: "Tiphareth",
            },
        },
        zodiac: {
            sign: "Leo",
            start_date: "7/22",
            end_date: "8/22",
        },
        symbol: "♌️",
    },
    Hermit: {
        kabbalah: {
            letter: {
                hebrew: "י",
                name: "yod",
                gematria: 10,
            },
            tree: {
                from: "Tiphareth",
                to: "Netzach",
            },
        },
        zodiac: {
            sign: "Virgo",
            start_date: "8/23",
            end_date: "9/22",
        },
        symbol: "♍️",
    },
    "Wheel of Fortune": {
        kabbalah: {
            letter: {
                hebrew: "כ",
                name: "kaph",
                gematria: 20,
            },
            tree: {
                from: "Chesed",
                to: "Netzach",
            },
        },
        astro: "Jupiter",
        symbol: "♃",
    },
    Justice: {
        kabbalah: {
            letter: {
                hebrew: "ל",
                name: "lamed",
                gematria: 30,
            },
            tree: {
                from: "Hod",
                to: "Yesod",
            },
        },
        zodiac: {
            sign: "Libra",
            start_date: "9/23",
            end_date: "10/22",
        },
        symbol: "♎️",
    },
    "Hanged Man": {
        kabbalah: {
            letter: {
                hebrew: "מ",
                name: "mem",
                gematria: 40,
            },
            tree: {
                from: "Netzach",
                to: "Hod",
            },
        },
        element: "Water",
        symbol: "🜄",
    },
    Death: {
        kabbalah: {
            letter: {
                hebrew: "נ",
                name: "nun",
                gematria: 50,
            },
            tree: {
                from: "Netzach",
                to: "Yesod",
            },
        },
        zodiac: {
            sign: "Scorpio",
            start_date: "10/23",
            end_date: "11/22",
        },
        symbol: "♏️",
    },
    Temperance: {
        kabbalah: {
            letter: {
                hebrew: "ס",
                name: "samekh",
                gematria: 60,
            },
            tree: {
                from: "Tiphareth",
                to: "Hod",
            },
        },
        zodiac: {
            sign: "Sagittarius",
            start_date: "11/23",
            end_date: "12/21",
        },
        symbol: "♐️",
    },
    Devil: {
        kabbalah: {
            letter: {
                hebrew: "ע",
                name: "ayin",
                gematria: 70,
            },
            tree: {
                from: "Binah",
                to: "Tiphareth",
            },
        },
        zodiac: {
            sign: "Capricorn",
            start_date: "12/22",
            end_date: "1/19",
        },
        symbol: "♑️",
    },
    Tower: {
        kabbalah: {
            letter: {
                hebrew: "פ",
                name: "peh",
                gematria: 80,
            },
            tree: {
                from: "Geburah",
                to: "Hod",
            },
        },
        astro: "Mars",
        symbol: "♂",
    },
    Star: {
        kabbalah: {
            letter: {
                hebrew: "צ",
                name: "tzaddi",
                gematria: 90,
            },
            tree: {
                from: "Geburah",
                to: "Tiphareth",
            },
        },
        zodiac: {
            sign: "Aquarius",
            start_date: "1/20",
            end_date: "2/18",
        },
        symbol: "♒️",
    },
    Moon: {
        kabbalah: {
            letter: {
                hebrew: "ק",
                name: "koph",
                gematria: 100,
            },
            tree: {
                from: "Binah",
                to: "Chesed",
            },
        },
        zodiac: {
            sign: "Pisces",
            start_date: "2/19",
            end_date: "3/20",
        },
        symbol: "♓️",
    },
    Sun: {
        kabbalah: {
            letter: {
                hebrew: "ר",
                name: "rosh",
                gematria: 200,
            },
            tree: {
                from: "Tiphareth",
                to: "Yesod",
            },
        },
        astro: "Sun",
        symbol: "☉",
    },
    Judgement: {
        kabbalah: {
            letter: {
                hebrew: "ש",
                name: "shin",
                gematria: 300,
            },
            tree: {
                from: "Chokmah",
                to: "Binah",
            },
        },
        element: "Fire",
        symbol: "🜂",
    },
    World: {
        kabbalah: {
            letter: {
                hebrew: "ת",
                name: "tav",
                gematria: 400,
            },
            tree: {
                from: "Yesod",
                to: "Malkuth",
            },
        },
        astro: "Saturn",
        symbol: "♄",
    },
};

const sefirot = {
    Kether: {
        rank: 1,
        hebrew: "כתר",
        represents: "Crown",
        quality: "Creative Urge",
        bodypart: "Skull",
        world: "Atziluth",
        celestial: "Saturn",
    },
    Chokmah: {
        rank: 2,
        hebrew: "הכמה",
        represents: "Wisdom",
        quality: "Force",
        bodypart: "Right Brain",
        world: "Atziluth",
    },
    Binah: {
        rank: 3,
        hebrew: "בינה",
        represents: "Understanding",
        quality: "Concept",
        bodypart: "Left Brain",
        world: "Briah",
    },
    Chesed: {
        rank: 4,
        hebrew: "חסד",
        represents: "Mercy",
        quality: "Expansion",
        bodypart: "Right Arm",
        world: "Briah",
        celestial: "Moon",
    },
    Geburah: {
        rank: 5,
        hebrew: "גבורה",
        represents: "Strength",
        quality: "Restriction",
        bodypart: "Left Arm",
        world: "Briah",
    },
    Tiphareth: {
        rank: 6,
        hebrew: "תפארת",
        represents: "Beauty",
        quality: "Illumination",
        bodypart: "Torso",
        world: "Yetzirah",
        celestial: "Venus",
    },
    Netzach: {
        rank: 7,
        hebrew: "נצח",
        represents: "Victory",
        quality: "Creativity",
        bodypart: "Right Leg",
        world: "Yetzirah",
        celestial: "Mars",
    },
    Hod: {
        rank: 8,
        hebrew: "הוד",
        represents: "Splendor",
        quality: "Logic",
        bodypart: "Left Leg",
        world: "Yetzirah",
        celestial: "Sun",
    },
    Yesod: {
        rank: 9,
        hebrew: "יסוד",
        represents: "Foundation",
        quality: "Potential",
        bodypart: "Genitals",
        world: "Yetzirah",
        celestial: "Mercury",
    },
    Malkuth: {
        rank: 10,
        hebrew: "מלכות",
        represents: "Kingdom",
        quality: "Manifestation",
        world: "Assiah",
        celestial: "Jupiter",
    },
};

const worlds = {
    Assiah: {
        quality: "Material",
        soul: "Instinct",
        hebrew: "נפש",
        latin: "Nephesh",
    },
    Yetzirah: {
        quality: "Formative",
        soul: "Morality",
        hebrew: "רוח",
        latin: "Ruach",
    },
    Briah: {
        quality: "Creative",
        soul: "Awareness",
        hebrew: "נשמה",
        latin: "Neshamah",
    },
    Atziluth: {
        quality: "Archetypal",
        soul: "Living Being",
        hebrew: "חיה",
        latin: "Chiah",
    },
};

const getObject = (name, arr) => ({ name, ...arr[name] }),
    getSefira = (name) => getObject(name, sefirot),
    getWorld = (name) => getObject(name, worlds);

const kabbalahRanks = {
    Ace: { sefira: getSefira("Kether") },
    2: { sefira: getSefira("Chokmah") },
    3: { sefira: getSefira("Binah") },
    4: { sefira: getSefira("Chesed") },
    5: { sefira: getSefira("Geburah") },
    6: { sefira: getSefira("Tiphareth") },
    7: { sefira: getSefira("Netzach") },
    8: { sefira: getSefira("Hod") },
    9: { sefira: getSefira("Yesod") },
    10: { sefira: getSefira("Malkuth") },
    Page: { world: getWorld("Assiah") },
    Knight: { world: getWorld("Yetzirah") },
    Queen: { world: getWorld("Briah") },
    King: { world: getWorld("Atziluth") },
};

const kabbalahSuits = {
    Pentacles: { element: "Earth", world: getWorld("Assiah") },
    Swords: { element: "Air", world: getWorld("Yetzirah") },
    Cups: { element: "Water", world: getWorld("Briah") },
    Wands: { element: "Fire", world: getWorld("Atziluth") },
};

export { kabbalahMajors, kabbalahRanks, kabbalahSuits };
