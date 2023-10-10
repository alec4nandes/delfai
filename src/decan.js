import { allCards } from "./compare/data";
import { compareCards } from "./compare/compare.js";

const minors = [
    {
        card_name: "2 of Pentacles",
        start_date: "12/22",
        end_date: "12/30",
        astro: "Jupiter",
    },
    {
        card_name: "3 of Pentacles",
        start_date: "12/31",
        end_date: "1/9",
        astro: "Mars",
    },
    {
        card_name: "4 of Pentacles",
        start_date: "1/10",
        end_date: "1/19",
        astro: "Sun",
    },
    {
        card_name: "5 of Swords",
        start_date: "1/20",
        end_date: "1/29",
        astro: "Venus",
    },
    {
        card_name: "6 of Swords",
        start_date: "1/30",
        end_date: "2/8",
        astro: "Mercury",
    },
    {
        card_name: "7 of Swords",
        start_date: "2/9",
        end_date: "2/18",
        astro: "Moon",
    },
    {
        card_name: "8 of Cups",
        start_date: "2/19",
        end_date: "2/28",
        astro: "Saturn",
    },
    {
        card_name: "9 of Cups",
        start_date: "3/1",
        end_date: "3/10",
        astro: "Jupiter",
    },
    {
        card_name: "10 of Cups",
        start_date: "3/11",
        end_date: "3/20",
        astro: "Mars",
    },
    {
        card_name: "2 of Wands",
        start_date: "3/21",
        end_date: "3/30",
        astro: "Mars",
    },
    {
        card_name: "3 of Wands",
        start_date: "3/31",
        end_date: "4/10",
        astro: "Sun",
    },
    {
        card_name: "4 of Wands",
        start_date: "4/11",
        end_date: "4/20",
        astro: "Venus",
    },
    {
        card_name: "5 of Pentacles",
        start_date: "4/21",
        end_date: "4/30",
        astro: "Mercury",
    },
    {
        card_name: "6 of Pentacles",
        start_date: "5/1",
        end_date: "5/10",
        astro: "Moon",
    },
    {
        card_name: "7 of Pentacles",
        start_date: "5/11",
        end_date: "5/20",
        astro: "Saturn",
    },
    {
        card_name: "8 of Swords",
        start_date: "5/21",
        end_date: "5/31",
        astro: "Jupiter",
    },
    {
        card_name: "9 of Swords",
        start_date: "6/1",
        end_date: "6/10",
        astro: "Mars",
    },
    {
        card_name: "10 of Swords",
        start_date: "6/11",
        end_date: "6/20",
        astro: "Sun",
    },
    {
        card_name: "2 of Cups",
        start_date: "6/21",
        end_date: "7/1",
        astro: "Venus",
    },
    {
        card_name: "3 of Cups",
        start_date: "7/2",
        end_date: "7/11",
        astro: "Mercury",
    },
    {
        card_name: "4 of Cups",
        start_date: "7/12",
        end_date: "7/21",
        astro: "Moon",
    },
    {
        card_name: "5 of Wands",
        start_date: "7/22",
        end_date: "8/1",
        astro: "Saturn",
    },
    {
        card_name: "6 of Wands",
        start_date: "8/2",
        end_date: "8/11",
        astro: "Jupiter",
    },
    {
        card_name: "7 of Wands",
        start_date: "8/12",
        end_date: "8/22",
        astro: "Mars",
    },
    {
        card_name: "8 of Pentacles",
        start_date: "8/23",
        end_date: "9/1",
        astro: "Sun",
    },
    {
        card_name: "9 of Pentacles",
        start_date: "9/2",
        end_date: "9/11",
        astro: "Venus",
    },
    {
        card_name: "10 of Pentacles",
        start_date: "9/12",
        end_date: "9/22",
        astro: "Mercury",
    },
    {
        card_name: "2 of Swords",
        start_date: "9/23",
        end_date: "10/2",
        astro: "Moon",
    },
    {
        card_name: "3 of Swords",
        start_date: "10/3",
        end_date: "10/12",
        astro: "Saturn",
    },
    {
        card_name: "4 of Swords",
        start_date: "10/13",
        end_date: "10/22",
        astro: "Jupiter",
    },
    {
        card_name: "5 of Cups",
        start_date: "10/23",
        end_date: "11/1",
        astro: "Mars",
    },
    {
        card_name: "6 of Cups",
        start_date: "11/2",
        end_date: "11/12",
        astro: "Sun",
    },
    {
        card_name: "7 of Cups",
        start_date: "11/13",
        end_date: "11/22",
        astro: "Venus",
    },
    {
        card_name: "8 of Wands",
        start_date: "11/23",
        end_date: "12/2",
        astro: "Mercury",
    },
    {
        card_name: "9 of Wands",
        start_date: "12/3",
        end_date: "12/12",
        astro: "Moon",
    },
    {
        card_name: "10 of Wands",
        start_date: "12/13",
        end_date: "12/21",
        astro: "Saturn",
    },
];

const zodiacSigns = [
    {
        sign: "Aries",
        card_name: "Emperor",
        start_date: "3/21",
        end_date: "4/20",
    },
    {
        sign: "Taurus",
        card_name: "Hierophant",
        start_date: "4/21",
        end_date: "5/20",
    },
    {
        sign: "Gemini",
        card_name: "Lovers",
        start_date: "5/21",
        end_date: "6/20",
    },
    {
        sign: "Cancer",
        card_name: "Chariot",
        start_date: "6/21",
        end_date: "7/21",
    },
    {
        sign: "Leo",
        card_name: "Strength",
        start_date: "7/22",
        end_date: "8/22",
    },
    {
        sign: "Virgo",
        card_name: "Hermit",
        start_date: "8/23",
        end_date: "9/22",
    },
    {
        sign: "Libra",
        card_name: "Justice",
        start_date: "9/23",
        end_date: "10/22",
    },
    {
        sign: "Scorpio",
        card_name: "Death",
        start_date: "10/23",
        end_date: "11/22",
    },
    {
        sign: "Sagittarius",
        card_name: "Temperance",
        start_date: "11/23",
        end_date: "12/21",
    },
    {
        sign: "Capricorn",
        card_name: "Devil",
        start_date: "12/22",
        end_date: "1/19",
    },
    {
        sign: "Aquarius",
        card_name: "Star",
        start_date: "1/20",
        end_date: "2/18",
    },
    { sign: "Pisces", card_name: "Moon", start_date: "2/19", end_date: "3/20" },
];

const astro = {
    Mercury: "Magician",
    Moon: "High Priestess",
    Venus: "Empress",
    Jupiter: "Wheel of Fortune",
    Mars: "Tower",
    Sun: "Sun",
    Saturn: "World",
};

const courts = [
    { card_name: "Queen of Pentacles", start_date: "12/13", end_date: "1/9" },
    { card_name: "Knight of Swords", start_date: "1/10", end_date: "2/8" },
    { card_name: "King of Cups", start_date: "2/9", end_date: "3/10" },
    { card_name: "Queen of Wands", start_date: "3/11", end_date: "4/10" },
    { card_name: "Knight of Pentacles", start_date: "4/11", end_date: "5/10" },
    { card_name: "King of Swords", start_date: "5/11", end_date: "6/10" },
    { card_name: "Queen of Cups", start_date: "6/11", end_date: "7/11" },
    { card_name: "Knight of Wands", start_date: "7/12", end_date: "8/11" },
    { card_name: "King of Pentacles", start_date: "8/12", end_date: "9/11" },
    { card_name: "Queen of Swords", start_date: "9/12", end_date: "10/12" },
    { card_name: "Knight of Cups", start_date: "10/13", end_date: "11/12" },
    { card_name: "King of Wands", start_date: "11/13", end_date: "12/12" },
];

const suits = [
    {
        name: "Swords",
        element: "air",
        card_name: "Fool",
        start_date: "12/22",
        end_date: "3/20",
    },
    {
        name: "Pentacles",
        element: "earth",
        card_name: null,
        start_date: "3/21",
        end_date: "6/20",
    },
    {
        name: "Wands",
        element: "fire",
        card_name: "Judgement",
        start_date: "6/21",
        end_date: "9/22",
    },
    {
        name: "Cups",
        element: "water",
        card_name: "Hanged Man",
        start_date: "9/23",
        end_date: "12/21",
    },
];

function getToday() {
    const now = new Date(),
        month = now.getMonth() + 1,
        day = now.getDate();
    return getDay(month, day);
}

function getDay(month, day) {
    const date = `${month}/${day}`,
        d = getTimeFromString(date),
        minor = finder(minors, d),
        zodiac = finder(zodiacSigns, d),
        court = finder(courts, d),
        suit = finder(suits, d),
        result = { date, minor, zodiac, court, suit };
    return converter(result);
}

function getTimeFromString(dateStr) {
    const [month, day] = dateStr.split("/");
    return new Date(2023, month - 1, day).getTime();
}

function finder(arr, date) {
    return arr.find(({ start_date, end_date }) => {
        const start = getTimeFromString(start_date),
            end = getTimeFromString(end_date);
        if (start < end) {
            return start <= date && date <= end;
        } else {
            // "cusp" of decan wheel for 3 of Pentacles (12/31-1/9)
            return start <= date || date <= end;
        }
    });
}

function converter(dayInfo) {
    const { minor, zodiac, court, suit } = dayInfo,
        makeAcePage = (rank) => ({ card_name: `${rank} of ${suit.name}` }),
        page = makeAcePage("Page"),
        ace = makeAcePage("Ace"),
        spread = [minor, zodiac, court, page, ace].map(({ card_name }) => ({
            name: card_name,
            words: allCards[card_name],
        }));
    return compareCards(spread, "", true, false, getDecanPrompt(dayInfo));
}

function getDecanPrompt(info) {
    const { minor, zodiac, court, suit } = info,
        courtCard = court.card_name,
        page = `Page of ${suit.name}`,
        ace = `Ace of ${suit.name}`;
    return (
        "Write a paragraph explaining what advice the " +
        minor.card_name +
        " tarot card can give anyone for the calendar days " +
        `between ${minor.start_date} and ${minor.end_date}. ` +
        `Mention the date range and the zodiac sign ${zodiac.sign} ` +
        "in this first paragraph. When talking about the zodiac sign, " +
        `connect it to the major arcana card "${zodiac.card_name}". ` +
        `This time period is ruled by the celestial body "${minor.astro}" ` +
        `and its card "${astro[minor.astro]}". How do these tie in? ` +
        "In a second paragraph, without mentioning any other cards, briefly mention how the cards " +
        `${courtCard}, ${page}, and ${ace} could influence this timeframe.`
    );
}

export { getDay, getToday };
