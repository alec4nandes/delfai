import { useEffect } from "react";
import CardImages from "./CardImages";
import CustomSelect from "./CustomSelect";
import Compare from "./Reading/Compare/Compare";

export default function CustomReading({
    cards,
    customWaitRef,
    customRef,
    custom,
    setCustom,
    setCards,
    setIsCustom,
    user,
}) {
    useEffect(() => {
        customWaitRef.current.style.display = "block";
        customRef.current.innerHTML = "";
    }, [customRef, customWaitRef, cards]);

    return (
        <div id="alternative-page">
            <div className="container">
                <h1>Delfai Oracle</h1>
                <h2 className="bigger-header">Custom Spread</h2>
                {cards.question ? <h3>Asking: "{cards.question}"</h3> : <br />}
                <CustomSelect
                    {...{
                        user,
                        cards,
                        setCards,
                        custom,
                        setCustom,
                        setIsCustom,
                    }}
                />
                <br />
                <CardImages spread={cards.spread} />
                <br />
                <Compare {...cards} />
                <div className="wait" ref={customWaitRef}>
                    <br />
                    Reading... Please wait...
                </div>
                <br />
                <div
                    id={getCardsId(cards)}
                    className="reading"
                    ref={customRef}
                ></div>
                <br />
                <button
                    className="standard-btn"
                    onClick={() => window.location.reload()}
                >
                    go home
                </button>
                <br />
            </div>
        </div>
    );
}

function getCardsId(cards) {
    const spread = Array.isArray(cards.spread)
        ? cards.spread
        : ["past", "present", "future"].map(
              (timeframe) => cards.spread[timeframe]
          );
    return (
        spread.map(({ name }) => name.replaceAll(" ", "-")).join("-") +
        "-" +
        cards.question
    );
}

export { getCardsId };
