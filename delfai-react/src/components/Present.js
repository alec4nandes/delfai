import { handleJump } from "../display";
import TimeSlide from "./TimeSlide";

export default function Present({ card, question, elemRef }) {
    const nextButton = (
        <button onClick={(e) => handleJump("future")}>NEXT</button>
    );

    return (
        <TimeSlide
            {...{ card, timeframe: "Present", question, elemRef, nextButton }}
        />
    );
}
