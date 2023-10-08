import CardImages from "../CardImages";
import Compare from "../Compare/Compare";
import NextButton from "./NextButton";

export default function Spread({ cards, isKabbalah }) {
    const spread = ["past", "present", "future"].map(
        (timeframe) => cards?.spread[timeframe]
    );

    return (
        <div id="spread" className="slide">
            <div className="slide-container">
                <h2 className="bigger-header">3-Card Spread</h2>
                {isKabbalah && <h3>Kabbalah Focused</h3>}
                {cards.question && <h3>Asking: "{cards.question}"</h3>}
                <CardImages {...{ spread }} />
                <Compare {...cards} />
                <NextButton />
            </div>
        </div>
    );
}
