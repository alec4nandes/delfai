import { getCardsId } from "./components/Home/AiTextLoader";
import { auth } from "./database";

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
        const prompt = isCustom ? cards.prompt : cards.spread[timeframe].prompt,
            data = await getData(prompt),
            stream = await fetchStream(data);
        readStream(cards, stream, timeframe, elemRef, waitRef, isKabbalah);
    } catch (err) {
        console.error(err.message);
    }
}

async function getData(prompt) {
    const systemContent =
        "You are a wise yet friendly Tarot card reader " +
        "explaining my cards in an intimate setting.";
    return {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: systemContent,
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.7,
        projectId: "DELFAI",
        token: await auth.currentUser.getIdToken(true),
    };
}

async function fetchStream(data) {
    const response = await fetch(
        "https://qkhc7ig77yaaly33hd6i2he6yi0ydqdx.lambda-url.us-east-2.on.aws/",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }
    );
    return response.body;
}

function readStream(cards, stream, timeframe, elemRef, waitRef, isKabbalah) {
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
                elemRef.current.innerHTML += decoded;
            }
            // Read some more, and call this function again
            return !done && reader.read().then(processText);
        } else {
            return;
        }
    });
}

function handleJump(id, isHome) {
    if (id) {
        const elem = document.querySelector(`#${id}`);
        elem.scrollIntoView();
    } else {
        const scrollElem = document.querySelector(
            isHome ? "#home" : "#reading"
        );
        scrollElem.scrollTo({
            left: scrollElem.scrollLeft + window.innerWidth,
        });
    }
}

export { handleJump };
