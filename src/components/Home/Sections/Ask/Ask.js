import { useState } from "react";
import { getSpread } from "../../../../compare/spread.js";
import { doc, updateDoc } from "firebase/firestore";
import { IS_DEVELOPMENT, db } from "../../../../database.js";
import { compareCards } from "../../../../compare/compare.js";
import AskQuestion from "./AskQuestion";
import CustomReading from "./CustomReading";
import OtherQuestions from "./OtherQuestions";
import Reading from "./Reading/Reading";
import SelectCustomSpread from "./SelectCustomSpread.js";
import { Separator } from "../Dashboard/Dashboard";
import Subscribe from "../../Subscribe/Subscribe.js";

export default function Ask({ user, setUser }) {
    const [cards, setCards] = useState(),
        [custom, setCustom] = useState(getSpread().map(({ name }) => name)),
        [isCustom, setIsCustom] = useState(false),
        [size, setSize] = useState(3),
        [isKabbalah, setIsKabbalah] = useState(false),
        [showSubscribe, setShowSubscribe] = useState(false);

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
                        social life.{" "}
                        <a href="/home/?page=subscribe">Paid users</a> can also
                        include Kabbalah in their readings and can enter any
                        spread for any question.
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
                                    // NO MORE PAYWALL:
                                    // const invalid = isChecked && !user.paid;
                                    // setShowSubscribe(invalid);
                                    // invalid &&
                                    //     isKabbalah &&
                                    //     setIsKabbalah(false);
                                }}
                            />
                            enter a custom spread
                        </label>
                    </div>

                    {isCustom && !showSubscribe && (
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

                    {showSubscribe && (
                        <div>
                            {isKabbalah ? (
                                <p>
                                    Kabbalah readings are only available for
                                    paid users. Please consider joining for only{" "}
                                    <strong>$2.99/month</strong>.
                                </p>
                            ) : (
                                isCustom && (
                                    <p>
                                        Only paid members can enter custom
                                        spreads. Please consider joining for
                                        only $2.99 a month.
                                    </p>
                                )
                            )}
                            <Subscribe {...{ user }} />
                        </div>
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
    // NO MORE PAYWALL:
    // if (!user.paid && (isKabbalah || isCustom)) {
    //     alert("Please unselect the paid features.");
    //     return;
    // }
    const compare = compareCards(
        spread || getSpread(),
        question,
        isCustom,
        isKabbalah
    );
    setCards(compare);
    console.log(compare);
    // NO MORE PAYWALL:
    // if (!user.paid) {
    //     setUser((user) => ({ ...user, free_draws: user.free_draws - 1 }));
    //     updateDoc(doc(db, "users", user.email), {
    //         free_draws: user.free_draws - 1,
    //     });
    // }
}

function getCustomSpread(size, custom) {
    return getSpread(size, custom.slice(0, size).filter(Boolean));
}

export { handleQuestion, getCustomSpread };
