import CardImage from "./CardImage";
import NextButton from "./NextButton";

export default function Spread({ cards, question }) {
    return (
        <div id="spread" className="slide">
            <div className="slide-container">
                {cards.length ? (
                    <>
                        <div id="spread-images">
                            {cards.map((card) => (
                                <CardImage
                                    {...{ card, key: `card-image-${card}` }}
                                />
                            ))}
                        </div>
                        <p>Reading: {cards.join(", ")}</p>
                        {question ? <p>Asking: "{question}"</p> : <></>}
                        <NextButton />
                    </>
                ) : (
                    <p>Nothing loaded yet...</p>
                )}
            </div>
        </div>
    );
}
