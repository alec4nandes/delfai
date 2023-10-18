import { useState } from "react";
import { getSpread } from "../../../../compare/spread.js";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../database.js";
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
        <>
            {cards ? (
                isCustom ? (
                    <CustomReading {...{ cards, setCards, isKabbalah }} />
                ) : (
                    <Reading {...{ cards, setCards, isKabbalah }} />
                )
            ) : (
                <>
                    <label>
                        <input
                            type="checkbox"
                            checked={isKabbalah}
                            onChange={(e) => {
                                const isChecked = e.target.checked,
                                    invalid = isChecked && !user.paid;
                                setShowSubscribe(invalid);
                                setIsKabbalah(isChecked);
                                invalid && isCustom && setIsCustom(false);
                            }}
                        />
                        <a href="/kabbalah" target="_blank" rel="noopener">
                            Kabbalah
                        </a>
                        focused
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={isCustom}
                            onChange={(e) => {
                                const isChecked = e.target.checked,
                                    invalid = isChecked && !user.paid;
                                setShowSubscribe(invalid);
                                setIsCustom(isChecked);
                                invalid && isKabbalah && setIsKabbalah(false);
                            }}
                        />
                        Enter a Custom Spread
                    </label>

                    {isCustom && !showSubscribe && (
                        <SelectCustomSpread
                            {...{ isCustom, custom, setCustom, size, setSize }}
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
        </>
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
    if (!user.paid && (isKabbalah || isCustom)) {
        alert("Please unselect the paid features.");
        return;
    }
    const compare = compareCards(
        spread || getSpread(),
        question,
        isCustom,
        isKabbalah
    );
    setCards(compare);
    console.log(compare);
    if (!user.paid) {
        setUser((user) => ({ ...user, free_draws: user.free_draws - 1 }));
        updateDoc(doc(db, "users", user.email), {
            free_draws: user.free_draws - 1,
        });
    }
}

function getCustomSpread(size, custom) {
    return getSpread(size, custom.slice(0, size).filter(Boolean));
}

export { handleQuestion, getCustomSpread };
