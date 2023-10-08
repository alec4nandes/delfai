import CardImages from "../CardImages";
import Compare from "../Compare/Compare";
import KabbalahHeader from "../KabbalahHeader";
import NextButton from "./NextButton";

export default function Spread({ cards, isKabbalah }) {
    const spread = ["past", "present", "future"].map(
        (timeframe) => cards?.spread[timeframe]
    );

    return (
        <div id="spread" className="slide">
            <div className="slide-container">
                <h2 className="bigger-header">3-Card Spread</h2>
                <KabbalahHeader {...{ isKabbalah }} />
                {cards.question && <h3>Asking: "{cards.question}"</h3>}
                <CardImages {...{ spread, isKabbalah }} />
                <Compare {...cards} />
                <NextButton />
            </div>
        </div>
    );
}
