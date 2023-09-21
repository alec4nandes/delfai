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
                <>
                    <h2 className="bigger-header">3-Card Spread</h2>
                    {cards.question && <h3>Asking: "{cards.question}"</h3>}
                    <CardImages {...{ spread }} />
                    <br />
                    <Compare {...cards} />
                    <NextButton />
                </>
            </div>
        </div>
    );
}
