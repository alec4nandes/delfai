import getSpreadData from "./read-cards.js";

displaySpread();

async function displaySpread() {
    const data = await getSpreadData(),
        spreadElem = document.querySelector("#spread");
    Object.entries(data).forEach(([key, info]) => {
        const elem = spreadElem.querySelector(`#${key}`);
        loadReading(elem, info);
    });
}

function loadReading(elem, info) {
    const { card, reading } = info;
    card && (elem.querySelector(".card").textContent = card);
    elem.querySelector(".reading").textContent = reading;
}
