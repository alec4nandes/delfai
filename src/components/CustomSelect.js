import "../css/custom-spread.css";
import { useRef, useState } from "react";
import { getSpread } from "../compare/spread.js";
import { allCards } from "../compare/data.js";
import { compareCards } from "../compare/compare.js";
import Subscribe from "./Home/Subscribe/Subscribe";
import AskTextarea from "./AskTextarea";

export default function CustomSelect({
    user,
    cards,
    setCards,
    custom,
    setCustom,
    setIsCustom,
    waitRef,
    setIsTransition,
    setIsKabbalah,
    isKabbalah,
}) {
    const currentCards = cards?.spread.map(({ name }) => name) || [],
        question = cards?.question || "",
        [size, setSize] = useState(currentCards.length || 3),
        formRef = useRef();

    return (
        <details>
            <summary className="standard-btn">Enter a Custom Spread</summary>
            {user.paid ? (
                <div id="custom-spread">
                    <label>
                        spread size:{" "}
                        <select
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
                    <AskTextarea
                        {...{
                            onChangeHandler: () => {
                                const cardNames = getCardNames().map(
                                    (name, i) =>
                                        name ||
                                        custom[i] ||
                                        currentCards[i] ||
                                        ""
                                );
                                setCustom(cardNames);
                            },
                            onSubmitHandler: handleFormSubmit,
                            user,
                            formRef,
                            custom: new Array(size)
                                .fill(0)
                                .map((_, i) => (
                                    <SelectCard
                                        {...{ i, key: `select-${i + 1}` }}
                                    />
                                )),
                            setIsKabbalah,
                            isKabbalah,
                        }}
                    />
                </div>
            ) : (
                <>
                    <p>
                        Only paid members can enter custom spreads. Please
                        consider joining for only $2.99 a month.
                    </p>
                    <Subscribe {...{ user }} />
                </>
            )}
        </details>
    );

    function getCardNames() {
        const data = getFormData(),
            cardNames = new Array(10).fill(0).map((_, i) => {
                const cardName = data[`card_${i + 1}`];
                if (cardName) {
                    const is_reversed = data[`reversed_${i + 1}`];
                    return cardName + (is_reversed ? " reversed" : "");
                }
                return "";
            });
        return cardNames;
    }

    function getFormData() {
        const formEl = formRef.current,
            formData = new FormData(formEl);
        return Object.fromEntries(formData);
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        waitRef && (waitRef.current.style.visibility = "visible");
        const cardNames = getCardNames().filter(Boolean),
            data = getFormData(),
            isValid =
                new Set(
                    cardNames.map((cardName) =>
                        cardName.replace(" reversed", "")
                    )
                ).size === size,
            isSameAsCurrent =
                data.question.trim() === question.trim() &&
                cardNames.length === currentCards.length &&
                cardNames.every((card) => currentCards.includes(card)) &&
                e.target.kabbalah.checked === isKabbalah;
        if (isValid && !isSameAsCurrent) {
            setCards(
                compareCards(
                    getSpread(null, cardNames),
                    data.question,
                    true,
                    isKabbalah
                )
            );
            setIsCustom(true);
            setIsTransition(true);
        } else if (!isValid) {
            alert(
                "Your custom spread has either missing or repeating cards. Please fix."
            );
        } else if (isSameAsCurrent) {
            alert(
                "This spread already has a reading that's loading below. Please explore other spreads before coming back to this one."
            );
        }
    }

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
