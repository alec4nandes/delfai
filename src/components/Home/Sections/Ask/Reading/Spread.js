import CardImages from "../../../CardImages/CardImages";
import Compare from "../../../Compare/Compare";
import KabbalahHeader from "../../../KabbalahHeader";

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
            </div>
        </div>
    );
}
