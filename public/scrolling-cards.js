const getScrollCardsElems = () => {
    const headerElem = document.querySelector("header"),
        scrollCardsElems = [
            ...(headerElem?.querySelectorAll(".scroll-cards") || []),
        ];
    return scrollCardsElems;
};

setTimeout(() => {
    const scrollCardsElems = getScrollCardsElems();
    if (scrollCardsElems.length) {
        const cardNames = [
                "Fool",
                "High Priestess",
                "Wheel of Fortune",
                "Temperance",
                "10 of Cups",
            ],
            getCardImgs = (isReversed) =>
                (isReversed ? [...cardNames].reverse() : cardNames)
                    .map(
                        (cardName) =>
                            `<img src="/home/assets/cards/${cardName}.jpg"/>`
                    )
                    .join(""),
            addCardImgs = (elem, i) => (elem.innerHTML += getCardImgs(!!i));
        const intervals = new Array(scrollCardsElems.length).fill(0);
        scrollCardsElems.forEach((elem, i) => {
            addCardImgs(elem, i);
            intervals[i] = setInterval(() => {
                !getScrollCardsElems().length && clearInterval(intervals[i]);
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
}, 1000);
