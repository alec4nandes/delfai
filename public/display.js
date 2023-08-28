import getRandomCards from "./deck.js";

async function handleSubmit(e) {
    e.preventDefault();
    const cards = getRandomCards(),
        spreadElem = document.querySelector("#spread");
    e.target.style.display = "none";
    spreadElem.style.display = "flex";
    ["past", "present", "future", "advice"].forEach((timeframe, i) =>
        displayData(timeframe, i, cards, spreadElem)
    );
}

async function displayData(timeframe, i, cards, spreadElem) {
    try {
        const endpoint = "http://localhost:5001/delfai/us-central1/api",
            // endpoint = "https://us-central1-delfai.cloudfunctions.net/api",
            card = cards[i],
            question = e.target.question.value,
            response = await fetch(`${endpoint}/${timeframe}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ card, cards, question }),
            });
        const timeElem = spreadElem.querySelector(`#${timeframe}`),
            cardElem = timeElem.querySelector(".card"),
            imgElem = timeElem.querySelector("img"),
            readingElem = timeElem.querySelector(".reading");
        cardElem && (cardElem.textContent = card);
        if (imgElem) {
            imgElem.src = `/assets/cards/${card.replace(" reversed", "")}.jpg`;
            imgElem.alt = card;
            card.includes(" reversed") && imgElem.classList.add("reversed");
        }
        fetchStream(response.body, timeframe, readingElem);
    } catch (err) {
        spreadElem.innerHTML = `${err.code}: ${err.message}`;
        spreadElem.classList.add("error");
    }
}

function fetchStream(stream, timeframe, readingElem) {
    const reader = stream.getReader();
    // read() returns a promise that fulfills
    // when a value has been received
    reader.read().then(function processText({ done, value }) {
        // Result objects contain two properties:
        // done  - true if the stream has already given you all its data.
        // value - some data. Always undefined when done is true.
        if (done) {
            console.log(`${timeframe} stream complete!`);
            return;
        }
        readingElem.textContent += new TextDecoder().decode(value);
        // Read some more, and call this function again
        return reader.read().then(processText);
    });
}

export { handleSubmit };
