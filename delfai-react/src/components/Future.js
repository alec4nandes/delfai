import { handleJump } from "../display";
import TimeSlide from "./TimeSlide";

export default function Future({ card, question, elemRef }) {
    const nextButton = (
        <button onClick={(e) => handleJump("advice")}>NEXT</button>
    );

    return (
        <TimeSlide
            {...{ card, timeframe: "Future", question, elemRef, nextButton }}
        />
    );
}
