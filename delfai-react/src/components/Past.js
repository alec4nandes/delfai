import { handleJump } from "../display.js";
import TimeSlide from "./TimeSlide";

export default function Past({ card, question, elemRef }) {
    const nextButton = (
        <button onClick={(e) => handleJump("present")}>NEXT</button>
    );

    return (
        <TimeSlide
            {...{ card, timeframe: "Past", question, elemRef, nextButton }}
        />
    );
}
