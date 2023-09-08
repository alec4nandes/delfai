import "../../css/custom-spread.css";
import { useRef, useState } from "react";
import { getSpread } from "../../compare/spread.js";
import { cards } from "../../compare/data.js";
import { compareCards } from "../../compare/compare.js";

export default function CustomSelect({
    custom,
    setCustom,
    setCards,
    setIsCustom,
}) {
    const [size, setSize] = useState(3),
        formRef = useRef();

    return (
        <div id="custom-spread">
            <br />
            <label>
                set size:{" "}
                <select
                    defaultValue={size}
                    onChange={(e) => setSize(+e.target.value)}
                >
                    {new Array(10).fill(0).map((_, i) => (
                        <option value={i + 1} key={`spread-size-${i + 1}`}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </label>
            <form
                ref={formRef}
                onChange={() => setCustom(getCardNames())}
                onSubmit={handleFormSubmit}
            >
                {new Array(size).fill(0).map((_, i) => (
                    <SelectCard {...{ i, key: `select-${i + 1}` }} />
                ))}
                <textarea
                    name="question"
                    placeholder="Ask a question (optional)..."
                ></textarea>
                <button className="standard-btn" type="submit">
                    read cards
                </button>
            </form>
            <br />
        </div>
    );

    function handleFormSubmit(e) {
        e.preventDefault();
        const formEl = e.target,
            formData = new FormData(formEl),
            data = Object.fromEntries(formData),
            cardNames = new Array(10)
                .fill(0)
                .map((_, i) => {
                    const cardName = data[`card_${i + 1}`];
                    if (cardName) {
                        const is_reversed = data[`reversed_${i + 1}`];
                        return cardName + (is_reversed ? " reversed" : "");
                    }
                    return null;
                })
                .filter(Boolean),
            isValid =
                new Set(
                    cardNames.map((cardName) =>
                        cardName.replace(" reversed", "")
                    )
                ).size === size;
        if (isValid) {
            setCards(
                compareCards(getSpread(null, cardNames), data.question, true)
            );
            setIsCustom(true);
        } else {
            alert("Your custom spread has repeating cards. Please fix.");
            return;
        }
    }

    function getCardNames() {
        const formEl = formRef.current,
            formData = new FormData(formEl),
            data = Object.fromEntries(formData),
            cardNames = new Array(10)
                .fill(0)
                .map((_, i) => {
                    const cardName = data[`card_${i + 1}`];
                    if (cardName) {
                        const is_reversed = data[`reversed_${i + 1}`];
                        return cardName + (is_reversed ? " reversed" : "");
                    }
                    return null;
                })
                .filter(Boolean);
        return cardNames;
    }

    function SelectCard({ i }) {
        return (
            <div className="custom-card-select">
                <select
                    name={`card_${i + 1}`}
                    defaultValue={custom[i]?.replace(" reversed", "")}
                >
                    {Object.keys(cards).map((cardName) => (
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
