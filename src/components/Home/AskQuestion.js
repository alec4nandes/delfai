import Questions, { handleQuestion } from "./Questions";

export default function AskQuestion({
    user,
    setCards,
    setUser,
    setIsTransition,
}) {
    return (
        <>
            <CustomQuestion {...{ setCards, setUser, user, setIsTransition }} />
            <Separator />
            <Questions {...{ setCards, setUser, user, setIsTransition }} />
        </>
    );
}

function CustomQuestion({ setCards, setUser, user, setIsTransition }) {
    return (
        <>
            <h2>Ask the Tarot cards a question:</h2>
            <p>
                <u>Please note</u>: These cards are primarily for personal
                reflection, rather than for providing definitive answers.
            </p>
            <form
                id="custom-question"
                onSubmit={(e) =>
                    handleQuestion(
                        e.target.question.value,
                        setCards,
                        setUser,
                        user,
                        setIsTransition
                    )
                }
            >
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
}

function Separator() {
    return (
        <img
            className="separator"
            src="/assets/separator.png"
            alt="decorative dividing line made up of square swirls in the Greek style."
        />
    );
}

export { Separator };
