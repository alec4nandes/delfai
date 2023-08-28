import getRandomCards from "./deck.js";

async function handleSubmit(e) {
    e.preventDefault();
    const cards = getRandomCards(),
        newReadingButton = document.querySelector("button#new-reading"),
        question = e.target.question.value,
        customForm = document.querySelector("form#custom"),
        questionsElem = document.querySelector("#questions"),
        loadingElem = document.querySelector("#loading"),
        spreadElem = document.querySelector("#spread");
    [customForm, questionsElem].forEach(
        (elem) => (elem.style.display = "none")
    );
    newReadingButton.style.display = "inline-block";
    loadingElem.innerHTML = `
        Reading cards: ${cards.join(", ")}...
        ${
            question
                ? `
                    <br/>
                    Asking: "${question}"
                `
                : ""
        }
    `;
    loadingElem.style.display = "block";
    ["past", "present", "future", "advice"].forEach((timeframe, i) =>
        displayData(timeframe, i, cards, question, loadingElem, spreadElem)
    );
}

async function displayData(
    timeframe,
    i,
    cards,
    question,
    loadingElem,
    spreadElem
) {
    try {
        const // endpoint = "http://localhost:5001/delfai/us-central1/api",
            endpoint = "https://us-central1-delfai.cloudfunctions.net/api",
            card = cards[i],
            response = await fetch(`${endpoint}/${timeframe}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ card, cards, question }),
            });
        loadingElem.style.display = "none";
        spreadElem.style.display = "flex";
        const questionElem = document.querySelector("#question"),
            timeElem = spreadElem.querySelector(`#${timeframe}`),
            cardElem = timeElem.querySelector(".card"),
            imgElem = timeElem.querySelector("img"),
            readingElem = timeElem.querySelector(".reading");
        question.trim() && (questionElem.textContent = question);
        cardElem && (cardElem.textContent = card);
        if (imgElem) {
            imgElem.src = `/assets/cards/${card.replace(" reversed", "")}.jpg`;
            imgElem.alt = card;
            card.includes(" reversed") && imgElem.classList.add("reversed");
        }
        fetchStream(response.body, timeframe, readingElem);
    } catch (err) {
        loadingElem.innerHTML = err.message;
        loadingElem.classList.add("error");
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
