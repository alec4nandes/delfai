import "../css/decan.css";
import { useEffect, useState } from "react";
import { getDay } from "../decan.js";
import { getCardsId } from "./CustomReading";
import Subscribe from "./Home/Subscribe/Subscribe";
import CardImages from "./CardImages";
import Compare from "./Compare/Compare";

export default function Decan({
    user,
    decanCards,
    setDecanCards,
    decanRef,
    decanWaitRef,
}) {
    const [showSubscribe, setShowSubscribe] = useState(false);

    return (
        <div id="alternative-page">
            <div id="decan" className="container">
                <h1>Delfai Oracle</h1>
                <h2 className="bigger-header">Card of the Day</h2>
                <p>
                    Use the{" "}
                    <a href="/assets/wheel.png" target="_blank" rel="noopener">
                        Decan Wheel
                    </a>{" "}
                    to see which Tarot cards apply to each day.
                </p>
                {showSubscribe && (
                    <div>
                        <p>
                            Decan calendar searches are only available for paid
                            users. Please consider joining for only{" "}
                            <strong>$2.99/month</strong>.
                        </p>
                        <Subscribe {...{ user }} />
                    </div>
                )}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const [year, month, day] = e.target.datetime.value
                                .split("T")[0]
                                .split("-"),
                            newCards = getDay(+month, +day),
                            getCardNames = (spread) =>
                                spread.map(({ name }) => name),
                            newCardNames = getCardNames(newCards.spread),
                            decanCardNames = getCardNames(decanCards.spread),
                            isSameAsCurrent = decanCardNames.every((card) =>
                                newCardNames.includes(card)
                            );
                        isSameAsCurrent
                            ? alert(
                                  "This date has the same cards as the current reading. Try picking a new date at least 10 days before or after this one."
                              )
                            : setDecanCards(newCards);
                    }}
                >
                    <input
                        type="datetime-local"
                        name="datetime"
                        defaultValue={formatDatetimeInputValue(new Date())}
                        onChange={() => !user.paid && setShowSubscribe(true)}
                    />
                    <button className="standard-btn" type="submit">
                        look up
                    </button>
                </form>
                <CardImages
                    {...{
                        spread: decanCards.spread,
                        isKabbalah: false,
                    }}
                />
                <Compare {...decanCards} />
                <div className="wait" ref={decanWaitRef}>
                    Reading... Please wait...
                </div>
                <div
                    id={getCardsId(decanCards)}
                    className="reading"
                    ref={decanRef}
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

function formatDatetimeInputValue(date) {
    const pad = (num) => (num + "").padStart(2, "0"),
        year = date.getFullYear(),
        month = pad(date.getMonth() + 1),
        day = pad(date.getDate());
    return `${year}-${month}-${day}T00:00`; // 2023-10-09T00:00
}
