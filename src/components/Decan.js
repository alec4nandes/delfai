import "../css/decan.css";
import { useRef, useState } from "react";
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
    setIsTransition,
}) {
    const [showSubscribe, setShowSubscribe] = useState(false),
        dateRef = useRef();

    function formatDateHeader(date) {
        if (typeof date === "string") {
            const [year, month, day] = date.split("T")[0].split("-");
            return `${+month}/${+day}`;
        } else {
            return `${date.getMonth() + 1}/${date.getDate()}`;
        }
    }

    return (
        <div id="alternative-page">
            <div id="decan" className="container">
                <h1>Delfai Oracle</h1>
                <h2 className="bigger-header">Card of the Day</h2>
                <h2 ref={dateRef}>
                    {decanCards.date}
                    <br />
                    {decanCards.spread[0].name}
                </h2>
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
                <form onSubmit={handleDecanSubmit}>
                    <input
                        type="datetime-local"
                        name="datetime"
                        defaultValue={formatDatetimeInputValue(decanCards.date)}
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

    function handleDecanSubmit(e) {
        e.preventDefault();
        if (!user.paid) {
            setShowSubscribe(true);
            alert("You must subscribe to look up other dates.");
            return;
        }
        const dateString = e.target.datetime.value,
            [year, month, day] = dateString.split("T")[0].split("-"),
            newCards = getDay(+month, +day),
            getCardNames = (spread) => spread.map(({ name }) => name),
            newCardNames = getCardNames(newCards.spread),
            decanCardNames = getCardNames(decanCards.spread),
            isSameAsCurrent = decanCardNames.every((card) =>
                newCardNames.includes(card)
            );
        if (isSameAsCurrent) {
            alert(
                "This date has the same cards as the current reading. Try picking a new date at least 10 days before or after this one."
            );
        } else {
            dateRef.current.textContent = formatDateHeader(dateString);
            setIsTransition(true);
            setDecanCards(newCards);
        }
    }
}

function formatDatetimeInputValue(date) {
    const pad = (num) => (num + "").padStart(2, "0"),
        [month, day] = date.split("/"),
        thisYear = new Date().getFullYear();
    return `${thisYear}-${pad(month)}-${pad(day)}T00:00`; // 2023-10-09T00:00
}
