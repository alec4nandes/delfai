import { useEffect, useRef, useState } from "react";
import { getDay, getToday } from "../../../../decan.js";
import fillRef from "../../../../display.js";
import AiTextLoader from "../../AiTextLoader";
import Subscribe from "../../Subscribe/Subscribe";
import CardImages from "../../CardImages/CardImages";
import Compare from "../../Compare/Compare";

export default function Decan({ user }) {
    const [decanCards, setDecanCards] = useState(getToday()),
        [showSubscribe, setShowSubscribe] = useState(false),
        [isReading, setIsReading] = useState(false),
        dateRef = useRef(),
        decanRef = useRef(),
        decanWaitRef = useRef();

    useEffect(() => {
        isReading &&
            fillRef(decanCards, null, decanWaitRef, decanRef, true, false);
    }, [decanCards, isReading]);

    function formatDateHeader(date) {
        if (typeof date === "string") {
            const { month, day } = getMonthAndDay(date);
            return `${+month}/${+day}`;
        } else {
            return `${date.getMonth() + 1}/${date.getDate()}`;
        }
    }

    return (
        <>
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
            <AiTextLoader
                {...{
                    isReading,
                    setIsReading,
                    waitRef: decanWaitRef,
                    elemRef: decanRef,
                    cards: decanCards,
                    isKabbalah: false,
                }}
            />
        </>
    );

    function handleDecanSubmit(e) {
        e.preventDefault();
        if (!user.paid) {
            setShowSubscribe(true);
            alert("You must subscribe to look up other dates.");
            return;
        }
        const dateString = e.target.datetime.value,
            { month, day } = getMonthAndDay(dateString),
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
            dateRef.current.innerHTML =
                formatDateHeader(dateString) +
                "<br/>" +
                newCards.spread[0].name;
            setDecanCards(newCards);
            setIsReading(false);
        }
    }
}

function getMonthAndDay(datetimeString) {
    const [month, day] = datetimeString.split("T")[0].split("-").slice(1);
    return { month, day };
}

function formatDatetimeInputValue(date) {
    const pad = (num) => (num + "").padStart(2, "0"),
        [month, day] = date.split("/"),
        thisYear = new Date().getFullYear();
    return `${thisYear}-${pad(month)}-${pad(day)}T00:00`; // 2023-10-09T00:00
}
