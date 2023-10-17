import CardImages from "../../CardImages/CardImages";
import Compare from "../../Compare/Compare";
import KabbalahHeader from "../../KabbalahHeader";
import AskQuestion from "./AskQuestion";

export default function CustomReading({
    user,
    setUser,
    cards,
    setCards,
    custom,
    setCustom,
    setIsTransition,
    setIsKabbalah,
    isKabbalah,
    customWaitRef,
    customRef,
}) {
    return (
        <div id="alternative-page">
            <div id="custom-spread" className="container">
                <h1>Delfai Oracle</h1>
                <h2 className="bigger-header">Custom Spread</h2>
                <KabbalahHeader {...{ isKabbalah }} />
                {cards.question && <h3>Asking: "{cards.question}"</h3>}
                <AskQuestion
                    {...{
                        user,
                        setUser,
                        cards,
                        setCards,
                        custom,
                        setCustom,
                        setIsTransition,
                        setIsKabbalah,
                        isKabbalah,
                    }}
                />
                <CardImages {...{ spread: cards.spread, isKabbalah }} />
                <Compare {...cards} />
                <div className="wait" ref={customWaitRef}>
                    Reading... Please wait...
                </div>
                <div
                    id={getCardsId(cards, isKabbalah)}
                    className="reading"
                    ref={customRef}
                ></div>
                <button
                    className="standard-btn"
                    onClick={() => window.location.reload()}
                >
                    go home
                </button>
            </div>
        </div>
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
