import { getCardsId } from "./components/Home/Sections/Ask/CustomReading";
import { apiRoot } from "./database.js";

export default async function fillRef(
    cards,
    timeframe,
    waitRef,
    elemRef,
    isCustom,
    isKabbalah
) {
    try {
        waitRef.current && (waitRef.current.style.visibility = "visible");
        elemRef.current && (elemRef.current.innerHTML = "");

        const apiEndpoint = "https://api.openai.com/v1/chat/completions",
            data = {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a wise yet friendly Tarot card reader explaining my cards in an intimate setting.",
                    },
                    {
                        role: "user",
                        content: isCustom
                            ? cards.prompt
                            : cards.spread[timeframe].prompt,
                    },
                ],
                stream: true,
                temperature: 0.7,
            },
            openAiApiKey = await (
                await fetch(`${apiRoot}/openai`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            ).text(),
            response = await fetch(apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${openAiApiKey}`,
                },
                body: JSON.stringify(data),
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
                const decoded = new TextDecoder().decode(value);
                parseDecoded(decoded, elemRef);
            }
            // Read some more, and call this function again
            return !done && reader.read().then(processText);
        } else {
            return;
        }
    });
}

function parseDecoded(decoded, elemRef) {
    const data = decoded
        .split("data:")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            try {
                return JSON.parse(line);
            } catch (err) {
                console.warn(line);
                return "";
            }
        });
    for (const piece of data) {
        const chunk = piece?.choices?.[0]?.delta?.content;
        elemRef.current.innerHTML += chunk || "";
    }
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
