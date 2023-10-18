setTimeout(() => {
    const headerElem = document.querySelector("header"),
        scrollCardsElems = [
            ...(headerElem?.querySelectorAll(".scroll-cards") || []),
        ];

    if (scrollCardsElems.length) {
        const cardNames = [
                "Fool",
                "High Priestess",
                "Wheel of Fortune",
                "Star",
                "World",
            ],
            getCardImgs = (isReversed) =>
                (isReversed ? [...cardNames].reverse() : cardNames)
                    .map(
                        (cardName) =>
                            `<img src="/assets/cards/${cardName}.jpg"/>`
                    )
                    .join(""),
            addCardImgs = (elem, i) => (elem.innerHTML += getCardImgs(!!i));

        scrollCardsElems.forEach((elem, i) => {
            addCardImgs(elem, i);
            setInterval(() => {
                const oldTop = elem.scrollTop;
                elem.scrollTop += 1;
                if (elem.scrollTop === oldTop) {
                    // reached end of scroll
                    console.log("adding cards images...");
                    addCardImgs(elem, i);
                }
            }, i * 5 + 25);
        });
    }
}, 500);
