import { useEffect, useRef } from "react";
import fillRef from "../display.js";
import CardImage from "./CardImage";
import NextButton from "./NextButton";

export default function TimeSlide({ card, timeframe, question, elemRef }) {
    const waitRef = useRef();

    useEffect(() => {
        card &&
            fillRef(timeframe, card, question, elemRef, null, waitRef.current);
    }, [card, question, elemRef, timeframe]);

    return (
        <div id={timeframe.toLowerCase()} className="slide">
            <div className="slide-container">
                <h2>{timeframe}</h2>
                <h3>{card}</h3>
                <CardImage {...{ card }} />
                <div id="wait" ref={waitRef}>
                    Reading... Please wait...
                </div>
                <div className="reading" ref={elemRef}></div>
                <NextButton />
            </div>
        </div>
    );
}
