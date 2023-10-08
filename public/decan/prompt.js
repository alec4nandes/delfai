function getPrompt(info) {
    const { minor, zodiac, court, suit } = info,
        { sign } = zodiac,
        zodiacEmojis = {
            Aries: "♈",
            Taurus: "♉",
            Gemini: "♊",
            Cancer: "♋",
            Leo: "♌",
            Virgo: "♍",
            Libra: "♎",
            Scorpio: "♏",
            Sagittarius: "♐",
            Capricorn: "♑",
            Aquarius: "♒",
            Pisces: "♓",
        },
        major = zodiac.card_name,
        courtCard = court.card_name,
        courtEmoji = courtCard.includes("Knight") ? "⚔️" : "👑",
        page = `Page of ${suit.name}`,
        ace = `Ace of ${suit.name}`,
        summary = {
            "📅 Days": `${minor.start_date} — ${minor.end_date}`,
            "🃏 Card": minor.card_name,
            [`${zodiacEmojis[sign]} Zodiac Sign`]: `${sign} (${major})`,
            "🔭 Celestial": `${minor.astro.name} (${minor.astro.card_name})`,
            [`${courtEmoji} Court Card`]: courtCard,
            "📄 Page": page,
            "🏆 Ace": ace,
        };
    return (
        "Start the post by displaying each key and value pair of this information: " +
        JSON.stringify(summary) +
        ". Then write a paragraph explaining what advice the " +
        minor.card_name +
        " tarot card can give anyone for the calendar days " +
        `between ${minor.start_date} and ${minor.end_date}. ` +
        `Mention the date range and the zodiac sign ${zodiac.sign} ` +
        "in this first paragraph. When talking about the zodiac sign, " +
        `connect it to the major arcana card "${zodiac.card_name}". ` +
        `This time period is ruled by the celestial body "${minor.astro.name}" ` +
        `and its card "${minor.astro.card_name}". How do these tie in? ` +
        "In a second paragraph, without mentioning any other cards, briefly mention how the cards " +
        `${courtCard}, ${page}, and ${ace} could influence this timeframe. ` +
        "Finally, on a new line, add five to ten hashtags that only contain single words, " +
        "not joined words or card names. The hashtags must all be lowercase and about tarot, " +
        "and should include #tarot and #tarotreading."
    );
}

const IS_DEVELOPMENT = true,
    productionRoot = "https://us-central1-delfai.cloudfunctions.net",
    devRoot = "http://localhost:5000/delfai/us-central1",
    apiRoot = IS_DEVELOPMENT ? devRoot : productionRoot;

async function askPrompt(prompt) {
    try {
        return await fetch(`${apiRoot}/reading/decan`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
        });
    } catch (err) {
        console.error(err.message);
    }
}

export { askPrompt, getPrompt };
