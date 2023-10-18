import { handleQuestion, getCustomSpread } from "./Ask";

export default function AskQuestion({
    user,
    setUser,
    setCards,
    custom,
    isCustom,
    isKabbalah,
    size,
}) {
    return (
        <>
            <h2>Ask the Tarot cards a question:</h2>
            <p>
                <u>Please note</u>: These cards are primarily for personal
                reflection, rather than for providing definitive answers.
            </p>

            <form onSubmit={handleFormSubmit}>
                <textarea
                    name="question"
                    placeholder="Ask a question (optional)..."
                ></textarea>
                <button className="standard-btn" type="submit">
                    ask
                </button>
            </form>
        </>
    );

    function handleFormSubmit(e) {
        e.preventDefault();
        handleQuestion(
            isCustom && getCustomSpread(size, custom),
            e.target.question.value,
            setCards,
            setUser,
            user,
            isKabbalah,
            isCustom
        );
    }
}
