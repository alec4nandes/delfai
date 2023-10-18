export default function AiTextLoader({
    isReading,
    setIsReading,
    waitRef,
    elemRef,
    cards,
    isKabbalah,
}) {
    return isReading ? (
        <>
            <div className="wait" ref={waitRef}>
                Reading... Please wait...
            </div>
            <div
                id={getCardsId(cards, isKabbalah)}
                className="response"
                ref={elemRef}
            ></div>
        </>
    ) : (
        <button className="standard-btn" onClick={() => setIsReading(true)}>
            get reading
        </button>
    );
}

function getCardsId(cards, isKabbalah) {
    const spread = Array.isArray(cards.spread)
            ? cards.spread
            : ["past", "present", "future"].map(
                  (timeframe) => cards.spread[timeframe]
              ),
        question = cards.question?.replaceAll("?", "").trim() || "",
        result = (
            spread.map(({ name }) => name).join("-") +
            "-" +
            question +
            (question ? "-" : "") +
            (isKabbalah ? "kab" : "no-kab")
        )
            .replaceAll(" ", "-")
            .toLowerCase();
    return result;
}

export { getCardsId };
