function getPrompt(info) {
    const { minor, court, ace_and_page: ap, zodiac } = info,
        summary = {
            Timeframe: `${minor.start_date} — ${minor.end_date}`,
            Card: minor.card_name,
            "Zodiac Sign": zodiac.sign,
            Celestial: minor.planet,
            "Court Card": court.card_name,
            Page: `Page of ${ap.suit}`,
            Ace: `Ace of ${ap.suit}`,
        };
    return (
        "Start the post by displaying each key and value pair of this information: " +
        JSON.stringify(summary) +
        ". Then Write a paragraph explaining what advice the " +
        minor.card_name +
        " tarot card can give someone for the calendar days " +
        `between ${minor.start_date} and ${minor.end_date}. ` +
        `How can the astrological meanings for the planet ${minor.planet} ` +
        "apply to this time period? " +
        `Mention the date range and the zodiac sign ${zodiac.sign} ` +
        "in this first paragraph. " +
        "Then, in a second paragraph, briefly mention how the cards " +
        `${summary.Ace}, ${summary.Page}, and ${summary["Court Card"]} ` +
        "could also influence this timeframe. " +
        "Finally, on a new line, add five to ten hashtags that only contain single words, " +
        "not joined words. The hashtags must all be lowercase and about tarot, and should include #tarot and #tarotreading."
    );
}

const IS_DEVELOPMENT = false,
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
