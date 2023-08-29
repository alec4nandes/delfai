import { useEffect, useRef } from "react";
import fillRef from "../display.js";

export default function Advice({ cards, question, elemRef }) {
    const waitRef = useRef();

    useEffect(() => {
        cards?.length &&
            fillRef("advice", null, question, elemRef, cards, waitRef.current);
    }, [elemRef, cards, question]);

    return (
        <div id="advice" className="slide">
            <div className="slide-container">
                <h2>Advice</h2>
                <div id="wait" ref={waitRef}>
                    Reading... Please wait...
                </div>
                <div className="reading" ref={elemRef}></div>
            </div>
        </div>
    );
}
