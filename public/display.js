async function displaySpread(data) {
    const spreadElem = document.querySelector("#spread"),
        loadingElem = document.querySelector("#loading"),
        questionElem = document.querySelector("#question"),
        { question } = data;
    delete data.question;
    Object.entries(data).forEach(([key, info]) => {
        const elem = spreadElem.querySelector(`#${key}`);
        loadReading(elem, info);
    });
    loadingElem.style.display = "none";
    spreadElem.style.display = "flex";
    questionElem.innerHTML = question;
}

function loadReading(elem, info) {
    const { card, reading } = info;
    if (card) {
        elem.querySelector(".card").textContent = card;
        const imgElem = elem.querySelector("img");
        imgElem.src = `/assets/cards/${card.replace(" reversed", "")}.jpg`;
        imgElem.alt = card;
        card.includes(" reversed") && imgElem.classList.add("reversed");
    }
    elem.querySelector(".reading").textContent = reading;
}

async function handleSubmit(e) {
    e.preventDefault();
    const loadingElem = document.querySelector("#loading");
    e.target.style.display = "none";
    loadingElem.style.display = "block";
    try {
        const // endpoint = "http://localhost:5001/delfai/us-central1/api",
            endpoint = "https://us-central1-delfai.cloudfunctions.net/api",
            question = e.target.question.value,
            response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ question }),
            }),
            data = await response.json();
        displaySpread(data);
    } catch (err) {
        loadingElem.textContent = err.message;
        loadingElem.classList.add("error");
    }
}

export default displaySpread;
export { handleSubmit };
