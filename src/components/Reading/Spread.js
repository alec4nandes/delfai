import CardImages from "../CardImages";
import Compare from "./Compare/Compare";
import NextButton from "./NextButton";

export default function Spread({ cards }) {
    const spread = ["past", "present", "future"].map(
        (timeframe) => cards?.spread[timeframe]
    );

    return (
        <div id="spread" className="slide">
            <div className="slide-container">
                {cards ? (
                    <>
                        <CardImages {...{ spread }} />
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
