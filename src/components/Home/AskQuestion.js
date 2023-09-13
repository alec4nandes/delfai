import Questions, { handleQuestion } from "./Questions";

export default function AskQuestion({ user, setCards, setUser }) {
    return (
        <>
            <CustomQuestion {...{ setCards, setUser, user }} />
            <Questions {...{ setCards, setUser, user }} />
        </>
    );
}

function CustomQuestion({ setCards, setUser, user }) {
    return (
        <>
            <img
                className="separator"
                src="/assets/separator.png"
                alt="decorative dividing line made up of square swirls in the Greek style."
            />
            <h2>Ask the Tarot cards a question:</h2>
            <p>
                <em>Please keep in mind while writing your question:</em>
                <br />
                These cards serve as a wellspring for personal introspection,
                rather than a means to definitively ascertain outcomes.
            </p>
            <form
                id="custom"
                onSubmit={(e) => handleQuestion(e, setCards, setUser, user)}
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
