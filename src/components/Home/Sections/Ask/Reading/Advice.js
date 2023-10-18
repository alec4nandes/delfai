import { useEffect, useRef, useState } from "react";
import fillRef from "../../../../../display.js";
import AiTextLoader from "../../../AiTextLoader";
import KabbalahHeader from "../../../KabbalahHeader";

export default function Advice({ cards, isKabbalah }) {
    const [isReading, setIsReading] = useState(false),
        waitRef = useRef(),
        elemRef = useRef();

    useEffect(() => {
        isReading &&
            fillRef(cards, "advice", waitRef, elemRef, false, isKabbalah);
    }, [cards, isKabbalah, isReading]);

    return (
        <div id="advice" className="slide">
            <h2 className="bigger-header">Advice</h2>
            <KabbalahHeader {...{ isKabbalah }} />
            <AiTextLoader
                {...{
                    isReading,
                    setIsReading,
                    waitRef,
                    elemRef,
                    cards,
                    isKabbalah,
                }}
            />
        </div>
    );
}
