import CardImage from "./CardImage";
import NextButton from "./NextButton";

export default function Spread({ cards }) {
    const cardNames = ["past", "present", "future"].map(
        (timeframe) => cards?.spread[timeframe].name
    );

    return (
        <div id="spread" className="slide">
            <div className="slide-container">
                {cards ? (
                    <>
                        <div id="spread-images">
                            {cardNames.map((card) => (
                                <CardImage
                                    {...{ card, key: `card-image-${card}` }}
                                />
                            ))}
                        </div>
                        <p>Reading: {cardNames.join(", ")}</p>
                        {cards.question ? (
                            <p>Asking: "{cards.question}"</p>
                        ) : (
                            <></>
                        )}
                        <NextButton />
                        <pre>{JSON.stringify(cards.matching, null, 4)}</pre>
                        <pre>{JSON.stringify(cards.opposites, null, 4)}</pre>
                    </>
                ) : (
                    <p>Nothing loaded yet...</p>
                )}
            </div>
        </div>
    );
}
