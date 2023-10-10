import { apiRoot } from "./database.js";
import { getCardsId } from "./components/CustomReading.js";

export default async function fillRef(
    cards,
    timeframe,
    waitRef,
    elemRef,
    isCustom,
    isKabbalah
) {
    try {
        elemRef.current && (elemRef.current.innerHTML = "");
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
        fetchStream(
            cards,
            response.body,
            timeframe,
            elemRef,
            waitRef,
            isKabbalah
        );
    } catch (err) {
        console.error(err.message);
    }
}

function fetchStream(cards, stream, timeframe, elemRef, waitRef, isKabbalah) {
    const reader = stream.getReader();
    // read() returns a promise that fulfills
    // when a value has been received
    reader.read().then(function processText({ done, value }) {
        // Result objects contain two properties:
        // done  - true if the stream has already given you all its data.
        // value - some data. Always undefined when done is true.
        if (elemRef?.current?.id === getCardsId(cards, isKabbalah)) {
            // check current id against cards. Sometimes a user might select a
            // new custom spread before the old one finishes reading.
            if (done) {
                console.log(`${timeframe} stream complete!`);
                waitRef.current.style.visibility = "hidden";
            } else {
                elemRef.current.textContent += new TextDecoder().decode(value);
            }
            // Read some more, and call this function again
            return !done && reader.read().then(processText);
        } else {
            return;
        }
    });
}

function handleJump(id) {
    if (id) {
        const elem = document.querySelector(`#${id}`);
        elem.scrollTo({ top: 0 });
        elem.scrollIntoView({ behavior: "smooth" });
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
