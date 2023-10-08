import { useEffect } from "react";
import CardImages from "./CardImages";
import CustomSelect from "./CustomSelect";
import Compare from "./Compare/Compare";
import KabbalahHeader from "./KabbalahHeader";

export default function CustomReading({
    cards,
    customWaitRef,
    customRef,
    custom,
    setCustom,
    setCards,
    setIsCustom,
    user,
    setIsTransition,
    setIsKabbalah,
    isKabbalah,
}) {
    useEffect(() => {
        customWaitRef.current.style.display = "block";
        customRef.current.innerHTML = "";
    }, [customRef, customWaitRef, cards]);

    return (
        <div id="alternative-page">
            <div id="custom-spread" className="container">
                <h1>Delfai Oracle</h1>
                <h2 className="bigger-header">Custom Spread</h2>
                <KabbalahHeader {...{ isKabbalah }} />
                {cards.question && <h3>Asking: "{cards.question}"</h3>}
                <CustomSelect
                    {...{
                        user,
                        cards,
                        setCards,
                        custom,
                        setCustom,
                        setIsCustom,
                        waitRef: customWaitRef,
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
        question = cards.question.replaceAll("?", "").trim(),
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
