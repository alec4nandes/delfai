import { useEffect, useRef, useState } from "react";
import fillRef from "../../../../display.js";
import AiTextLoader from "../../AiTextLoader";
import CardImages from "../../CardImages/CardImages";
import Compare from "../../Compare/Compare";
import KabbalahHeader from "../../KabbalahHeader";

export default function CustomReading({ cards, setCards, isKabbalah }) {
    const [isReading, setIsReading] = useState(false),
        waitRef = useRef(),
        elemRef = useRef();

    useEffect(() => {
        isReading &&
            fillRef(cards, "custom spread", waitRef, elemRef, true, isKabbalah);
    }, [cards, isKabbalah, isReading]);

    return (
        <>
            <nav id="reading-menu">
                <ul>
                    <li>
                        <button onClick={() => setCards(null)}>
                            New Spread
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="slide">
                <h2 className="bigger-header">Custom Spread</h2>
                <KabbalahHeader {...{ isKabbalah }} />
                {cards.question && <h3>Asking: "{cards.question}"</h3>}
                <CardImages
                    {...{
                        spread: cards.spread,
                        isKabbalah,
                    }}
                />
                <Compare {...cards} />
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
        </>
    );
}
