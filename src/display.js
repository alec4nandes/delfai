import { apiRoot } from "./database.js";

export default async function fillRef(
    cards,
    timeframe,
    waitRef,
    elemRef,
    isCustom
) {
    try {
        const response = await fetch(`${apiRoot}/reading`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: isCustom
                    ? cards.prompt
                    : cards.spread[timeframe].prompt,
            }),
        });
        waitRef.current.style.display = "none";
        fetchStream(response.body, timeframe, elemRef);
    } catch (err) {
        console.error(err.message);
    }
}

function fetchStream(stream, timeframe, elemRef) {
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
        elemRef?.current &&
            (elemRef.current.textContent += new TextDecoder().decode(value));
        // Read some more, and call this function again
        return reader.read().then(processText);
    });
}

function handleJump(id) {
    if (id) {
        document.querySelector(`#${id}`).scrollIntoView({ behavior: "smooth" });
    } else {
        const scrollElem = document.querySelector("main");
        scrollElem.scrollTo({
            left: scrollElem.scrollLeft + window.innerWidth,
            top: 0,
            behavior: "smooth",
        });
    }
}

export { handleJump };
