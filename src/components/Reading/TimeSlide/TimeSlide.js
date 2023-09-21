import { getCardsId } from "../../CustomReading";
import CardImage from "../../CardImage";
import Compare from "../Compare/Compare";
import NextButton from "../NextButton";
import Rank from "../../Rank";
import Suit from "../../Suit";

export default function TimeSlide({
    cards,
    card,
    timeframe,
    elemRef,
    waitRef,
}) {
    function getMatchingForCard() {
        const result = Object.entries(cards.matching).filter(([_, cardNames]) =>
            cardNames.includes(card.name)
        );
        return Object.fromEntries(result);
    }

    function getOppositesForCard() {
        const result = Object.entries(cards.opposites).filter(
            ([_, info]) =>
                info.cards.includes(card.name) ||
                Object.values(info).filter((oppoCards) =>
                    oppoCards.includes(card.name)
                ).length
        );
        return Object.fromEntries(result);
    }

    const matching = getMatchingForCard(),
        opposites = getOppositesForCard();

    return (
        <div id={timeframe.toLowerCase()} className="slide">
            <div className="slide-container">
                <h2 className="bigger-header">{timeframe}</h2>
                <h3>{card.name}</h3>
                <CardImage card={card.name} />
                <ul className="words-list">
                    {card.words.map((word) => (
                        <li key={`${card.name}-${word}`}>{word}</li>
                    ))}
                </ul>
                <Rank {...{ card }} />
                <Suit {...{ card }} />
                <Compare {...{ matching, opposites }} />
                <div className="wait" ref={waitRef}>
                    <br />
                    Reading... Please wait...
                </div>
                <br />
                <div
                    id={getCardsId(cards)}
                    className="reading"
                    ref={elemRef}
                ></div>
                <br />
                <NextButton />
            </div>
        </div>
    );
}
