const minors = [
    {
        card_name: "2 of Pentacles",
        start_date: "12/22",
        end_date: "12/30",
        planet: "Jupiter",
    },
    {
        card_name: "3 of Pentacles",
        start_date: "12/31",
        end_date: "1/9",
        planet: "Mars",
    },
    {
        card_name: "4 of Pentacles",
        start_date: "1/10",
        end_date: "1/19",
        planet: "Sun",
    },
    {
        card_name: "5 of Swords",
        start_date: "1/20",
        end_date: "1/29",
        planet: "Venus",
    },
    {
        card_name: "6 of Swords",
        start_date: "1/30",
        end_date: "2/8",
        planet: "Mercury",
    },
    {
        card_name: "7 of Swords",
        start_date: "2/9",
        end_date: "2/18",
        planet: "Moon",
    },
    {
        card_name: "8 of Cups",
        start_date: "2/19",
        end_date: "2/28",
        planet: "Saturn",
    },
    {
        card_name: "9 of Cups",
        start_date: "3/1",
        end_date: "3/10",
        planet: "Jupiter",
    },
    {
        card_name: "10 of Cups",
        start_date: "3/11",
        end_date: "3/20",
        planet: "Mars",
    },
    {
        card_name: "2 of Wands",
        start_date: "3/21",
        end_date: "3/30",
        planet: "Mars",
    },
    {
        card_name: "3 of Wands",
        start_date: "3/31",
        end_date: "4/10",
        planet: "Sun",
    },
    {
        card_name: "4 of Wands",
        start_date: "4/11",
        end_date: "4/20",
        planet: "Venus",
    },
    {
        card_name: "5 of Pentacles",
        start_date: "4/21",
        end_date: "4/30",
        planet: "Mercury",
    },
    {
        card_name: "6 of Pentacles",
        start_date: "5/1",
        end_date: "5/10",
        planet: "Moon",
    },
    {
        card_name: "7 of Pentacles",
        start_date: "5/11",
        end_date: "5/20",
        planet: "Saturn",
    },
    {
        card_name: "8 of Swords",
        start_date: "5/21",
        end_date: "5/31",
        planet: "Jupiter",
    },
    {
        card_name: "9 of Swords",
        start_date: "6/1",
        end_date: "6/10",
        planet: "Mars",
    },
    {
        card_name: "10 of Swords",
        start_date: "6/11",
        end_date: "6/20",
        planet: "Sun",
    },
    {
        card_name: "2 of Cups",
        start_date: "6/21",
        end_date: "7/1",
        planet: "Venus",
    },
    {
        card_name: "3 of Cups",
        start_date: "7/2",
        end_date: "7/11",
        planet: "Mercury",
    },
    {
        card_name: "4 of Cups",
        start_date: "7/12",
        end_date: "7/21",
        planet: "Moon",
    },
    {
        card_name: "5 of Wands",
        start_date: "7/22",
        end_date: "8/1",
        planet: "Saturn",
    },
    {
        card_name: "6 of Wands",
        start_date: "8/2",
        end_date: "8/11",
        planet: "Jupiter",
    },
    {
        card_name: "7 of Wands",
        start_date: "8/12",
        end_date: "8/22",
        planet: "Mars",
    },
    {
        card_name: "8 of Pentacles",
        start_date: "8/23",
        end_date: "9/1",
        planet: "Sun",
    },
    {
        card_name: "9 of Pentacles",
        start_date: "9/2",
        end_date: "9/11",
        planet: "Venus",
    },
    {
        card_name: "10 of Pentacles",
        start_date: "9/12",
        end_date: "9/22",
        planet: "Mercury",
    },
    {
        card_name: "2 of Swords",
        start_date: "9/23",
        end_date: "10/2",
        planet: "Moon",
    },
    {
        card_name: "3 of Swords",
        start_date: "10/3",
        end_date: "10/12",
        planet: "Saturn",
    },
    {
        card_name: "4 of Swords",
        start_date: "10/13",
        end_date: "10/22",
        planet: "Jupiter",
    },
    {
        card_name: "5 of Cups",
        start_date: "10/23",
        end_date: "11/1",
        planet: "Mars",
    },
    {
        card_name: "6 of Cups",
        start_date: "11/2",
        end_date: "11/12",
        planet: "Sun",
    },
    {
        card_name: "7 of Cups",
        start_date: "11/13",
        end_date: "11/22",
        planet: "Venus",
    },
    {
        card_name: "8 of Wands",
        start_date: "11/23",
        end_date: "12/2",
        planet: "Mercury",
    },
    {
        card_name: "9 of Wands",
        start_date: "12/3",
        end_date: "12/12",
        planet: "Moon",
    },
    {
        card_name: "10 of Wands",
        start_date: "12/13",
        end_date: "12/21",
        planet: "Saturn",
    },
];

const acePage = [
    { suit: "Swords", start_date: "12/22", end_date: "3/20" },
    { suit: "Pentacles", start_date: "3/21", end_date: "6/20" },
    { suit: "Wands", start_date: "6/21", end_date: "9/22" },
    { suit: "Cups", start_date: "9/23", end_date: "12/21" },
];

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
        card_name: "",
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
        ace = finder(acePage, d),
        court = finder(courts, d),
        zodiac = finder(zodiacSigns, d);
    return { date, minor, court, ace_and_page: ace, zodiac };
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

export { getDay, getToday };
