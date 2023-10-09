import Questions, { handleQuestion } from "./Questions";
import AskTextarea from "../AskTextarea";

export default function AskQuestion({
    user,
    setCards,
    setUser,
    setIsTransition,
    setIsKabbalah,
    isKabbalah,
}) {
    return (
        <>
            <CustomQuestion
                {...{
                    setCards,
                    setUser,
                    user,
                    setIsTransition,
                    setIsKabbalah,
                    isKabbalah,
                }}
            />
            <Separator />
            <Questions {...{ setCards, setUser, user, setIsTransition }} />
        </>
    );
}

function CustomQuestion({
    setCards,
    setUser,
    user,
    setIsTransition,
    setIsKabbalah,
    isKabbalah,
}) {
    return (
        <>
            <h2>Ask the Tarot cards a question:</h2>
            <p>
                <u>Please note</u>: These cards are primarily for personal
                reflection, rather than for providing definitive answers.
            </p>
            <AskTextarea
                {...{ onSubmitHandler, user, setIsKabbalah, isKabbalah }}
            />
        </>
    );

    function onSubmitHandler(e) {
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
