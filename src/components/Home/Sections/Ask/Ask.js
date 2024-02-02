import { useState } from "react";
import { getSpread } from "../../../../compare/spread.js";
import { IS_DEVELOPMENT } from "../../../../database.js";
import { compareCards } from "../../../../compare/compare.js";
import AskQuestion from "./AskQuestion";
import CustomReading from "./CustomReading";
import OtherQuestions from "./OtherQuestions";
import Reading from "./Reading/Reading";
import SelectCustomSpread from "./SelectCustomSpread.js";
import { Separator } from "../Dashboard/Dashboard";

export default function Ask({ user, setUser }) {
    const [cards, setCards] = useState(),
        [custom, setCustom] = useState(getSpread().map(({ name }) => name)),
        [isCustom, setIsCustom] = useState(false),
        [size, setSize] = useState(3),
        [isKabbalah, setIsKabbalah] = useState(false);

    return (
        <div className={`slide${cards ? " reading-slide" : ""}`}>
            {cards ? (
                isCustom ? (
                    <CustomReading {...{ cards, setCards, isKabbalah }} />
                ) : (
                    <Reading {...{ cards, setCards, isKabbalah, user }} />
                )
            ) : (
                <>
                    <h2 className="bigger-header">Ask a Question</h2>
                    <div className="description">
                        Here you can enter any question for the Tarot cards, or
                        select a qestion about love, career, health, or your
                        social life. Users can also include Kabbalah in their
                        readings and can enter any spread for any question.
                    </div>
                    <div id="ask-features">
                        <label>
                            <input
                                type="checkbox"
                                checked={isKabbalah}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    setIsKabbalah(isChecked);
                                    // NO MORE PAYWALL:
                                    // const invalid = isChecked && !user.paid;
                                    // setShowSubscribe(invalid);
                                    // invalid && isCustom && setIsCustom(false);
                                }}
                            />
                            <span>
                                <a
                                    href={`${
                                        IS_DEVELOPMENT
                                            ? "http://localhost:5000"
                                            : ""
                                    }/kabbalah`}
                                    target="_blank"
                                    rel="noopener"
                                >
                                    Kabbalah
                                </a>{" "}
                                focused
                            </span>
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={isCustom}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    setIsCustom(isChecked);
                                }}
                            />
                            enter a custom spread
                        </label>
                    </div>

                    {isCustom && (
                        <SelectCustomSpread
                            {...{
                                isCustom,
                                custom,
                                setCustom,
                                size,
                                setSize,
                            }}
                        />
                    )}

                    <AskQuestion
                        {...{
                            user,
                            setUser,
                            setCards,
                            custom,
                            isCustom,
                            isKabbalah,
                            size,
                        }}
                    />

                    <Separator />

                    <OtherQuestions
                        {...{
                            setCards,
                            setUser,
                            user,
                            isCustom,
                            custom,
                            isKabbalah,
                            size,
                        }}
                    />
                </>
            )}
        </div>
    );
}

function handleQuestion(
    spread,
    question,
    setCards,
    setUser,
    user,
    isKabbalah,
    isCustom
) {
    const compare = compareCards(
        spread || getSpread(),
        question,
        isCustom,
        isKabbalah
    );
    setCards(compare);
    console.log(compare);
}

function getCustomSpread(size, custom) {
    return getSpread(size, custom.slice(0, size).filter(Boolean));
}

export { handleQuestion, getCustomSpread };
