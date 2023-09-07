import CardImage from "./CardImage";
import Compare from "./Compare/Compare";
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
                        <Compare {...cards} />
                        <NextButton />
                    </>
                ) : (
                    <p>Nothing loaded yet...</p>
                )}
            </div>
        </div>
    );
}
