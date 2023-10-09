import { useState } from "react";
import Subscribe from "./Home/Subscribe/Subscribe";

export default function AskTextarea({
    onChangeHandler,
    onSubmitHandler,
    user,
    formRef,
    custom,
    setIsKabbalah,
    isKabbalah,
}) {
    const [showSubscribe, setShowSubscribe] = useState(false);

    return (
        <>
            <form
                id="custom-question"
                ref={formRef}
                onChange={onChangeHandler}
                onSubmit={(e) => {
                    e.preventDefault(e);
                    const isChecked = e.target.kabbalah.checked;
                    if (isChecked && !user.paid) {
                        alert(
                            "Only paid users can read Kabbalah spreads. Please either register or unselect the Kabbalah checkbox."
                        );
                        setShowSubscribe(true);
                    } else {
                        onSubmitHandler(e);
                    }
                }}
            >
                {custom}
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
                            !invalid && setIsKabbalah(isChecked);
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
}
