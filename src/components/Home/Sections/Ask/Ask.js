import AskQuestion from "./AskQuestion";
import OtherQuestions from "./OtherQuestions";
import { Separator } from "../Dashboard/Dashboard";

export default function Ask({
    user,
    setUser,
    cards,
    setCards,
    custom,
    setCustom,
    setIsTransition,
    setIsKabbalah,
    isKabbalah,
}) {
    return (
        <>
            <AskQuestion
                {...{
                    user,
                    setUser,
                    cards,
                    setCards,
                    custom,
                    setCustom,
                    setIsTransition,
                    setIsKabbalah,
                    isKabbalah,
                }}
            />
            <Separator />
            <OtherQuestions
                {...{
                    setCards,
                    setUser,
                    user,
                    setIsTransition,
                }}
            />
        </>
    );
}
