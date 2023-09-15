import CardImage from "../../CardImage";
import { getCardsId } from "../../CustomReading";
import Compare from "../Compare/Compare";
import NextButton from "../NextButton";

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
                <Compare {...{ matching, opposites }} />
                <div className="wait" ref={waitRef}>
                    Reading... Please wait...
                </div>
                <div
                    id={getCardsId(cards)}
                    className="reading"
                    ref={elemRef}
                ></div>
                <NextButton />
            </div>
        </div>
    );
}
