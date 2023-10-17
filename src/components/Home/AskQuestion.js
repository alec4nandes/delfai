import { useState } from "react";
import { allCards } from "../../compare/data.js";
import { handleQuestion } from "./OtherQuestions";
import Subscribe from "./Subscribe/Subscribe";

export default function AskQuestion({
    user,
    setUser,
    cards,
    setCards,
    custom,
    setIsTransition,
    setIsKabbalah,
    isKabbalah,
}) {
    const currentCards = cards?.spread.map(({ name }) => name) || [],
        [size, setSize] = useState(currentCards.length || 3),
        [showSubscribe, setShowSubscribe] = useState(false);

    return (
        <>
            <h2>Ask the Tarot cards a question:</h2>
            <p>
                <u>Please note</u>: These cards are primarily for personal
                reflection, rather than for providing definitive answers.
            </p>

            <form
                id="custom-question"
                onSubmit={(e) => {
                    e.preventDefault(e);
                    const isChecked = e.target.kabbalah.checked;
                    if (isChecked && !user.paid) {
                        alert(
                            "Only paid users can read Kabbalah spreads. Please either register or unselect the Kabbalah checkbox."
                        );
                        setShowSubscribe(true);
                    } else {
                        setIsKabbalah(isChecked);
                        handleFormSubmit(e, isChecked);
                    }
                }}
            >
                <Custom {...{ custom, user, size, setSize }} />
                <textarea
                    name="question"
                    placeholder="Ask a question (optional)..."
                ></textarea>
                <label>
                    <a href="/kabbalah" target="_blank" rel="noopener">
                        Kabbalah
                    </a>{" "}
                    focused:{" "}
                    <input
                        name="kabbalah"
                        type="checkbox"
                        defaultChecked={isKabbalah}
                        onChange={(e) => {
                            const isChecked = e.target.checked,
                                invalid = isChecked && !user.paid;
                            setShowSubscribe(invalid);
                            setIsKabbalah(isChecked);
                        }}
                    />
                </label>
                <button className="standard-btn" type="submit">
                    ask
                </button>
            </form>
            {showSubscribe && (
                <div>
                    <p>
                        Kabbalah readings are only available for paid users.
                        Please consider joining for only{" "}
                        <strong>$2.99/month</strong>.
                    </p>
                    <Subscribe {...{ user }} />
                </div>
            )}
        </>
    );

    function handleFormSubmit(e) {
        handleQuestion(
            e.target.question.value,
            setCards,
            setUser,
            user,
            setIsTransition,
            isKabbalah
        );
    }
}

function Custom({ custom, user, size, setSize }) {
    return (
        <details>
            <summary className="standard-btn">Enter a Custom Spread</summary>
            {user.paid ? (
                <div id="custom-spread">
                    <label>
                        spread size:{" "}
                        <select
                            name="custom"
                            defaultValue={size}
                            onChange={(e) => setSize(+e.target.value)}
                        >
                            {new Array(10).fill(0).map((_, i) => (
                                <option
                                    value={i + 1}
                                    key={`spread-size-${i + 1}`}
                                >
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </label>
                    {new Array(size).fill(0).map((_, i) => (
                        <SelectCard {...{ i, key: `select-${i + 1}` }} />
                    ))}
                </div>
            ) : (
                <div>
                    <p>
                        Only paid members can enter custom spreads. Please
                        consider joining for only $2.99 a month.
                    </p>
                    <Subscribe {...{ user }} />
                </div>
            )}
        </details>
    );

    function SelectCard({ i }) {
        return (
            <div className="custom-card-select">
                <select
                    name={`card_${i + 1}`}
                    defaultValue={custom[i]?.replace(" reversed", "") || ""}
                >
                    <option value="" disabled>
                        ---
                    </option>
                    {Object.keys(allCards).map((cardName) => (
                        <option value={cardName} key={`${cardName}-${i + 1}`}>
                            {cardName}
                        </option>
                    ))}
                </select>
                <label>
                    <input
                        name={`reversed_${i + 1}`}
                        type="checkbox"
                        defaultChecked={custom[i]?.includes(" reversed")}
                    />{" "}
                    reversed
                </label>
            </div>
        );
    }
}
