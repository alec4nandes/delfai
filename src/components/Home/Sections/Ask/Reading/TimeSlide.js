import { useEffect, useRef, useState } from "react";
import { kabbalahMajors } from "../../../../../kabbalah.js";
import fillRef from "../../../../../display.js";
import AiTextLoader from "../../../AiTextLoader.js";
import CardImage from "../../../CardImages/CardImage.js";
import Compare from "../../../Compare/Compare.js";
import KabbalahHeader from "../../../KabbalahHeader.js";
import MoreInfo from "../../../MoreInfo/MoreInfo.js";
import TreeOfLife from "../../../TreeOfLife.js";

export default function TimeSlide({ cards, card, timeframe, isKabbalah }) {
    const [isReading, setIsReading] = useState(false),
        waitRef = useRef(),
        elemRef = useRef();

    useEffect(() => {
        isReading &&
            fillRef(
                cards,
                timeframe.toLowerCase(),
                waitRef,
                elemRef,
                false,
                isKabbalah
            );
    }, [cards, isKabbalah, isReading, timeframe]);

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
        opposites = getOppositesForCard(),
        major = kabbalahMajors[card?.name.replace(" reversed", "")],
        sefs = {
            Ace: "kether",
            2: "chokmah",
            3: "binah",
            4: "chesed",
            5: "geburah",
            6: "tiphareth",
            7: "netzach",
            8: "hod",
            9: "yesod",
            10: "malkuth",
        },
        rank = +card?.name.split(" ")[0],
        numbered = sefs[rank];

    return (
        <div id={timeframe.toLowerCase()} className="slide">
            <h2 className="bigger-header">{timeframe}</h2>
            <KabbalahHeader {...{ isKabbalah }} />
            <h3>{card.name}</h3>
            <CardImage card={card.name} />
            <ul className="words-list">
                {card.words.map((word) => (
                    <li key={`${card.name}-${word}`}>{word}</li>
                ))}
            </ul>
            {isKabbalah && numbered && <TreeOfLife highlight={numbered} />}
            <MoreInfo {...{ card, isKabbalah }} />
            {isKabbalah && major && (
                <TreeOfLife
                    highlight={major?.kabbalah.letter.name || numbered}
                />
            )}
            <Compare {...{ matching, opposites }} />
            <AiTextLoader
                {...{
                    isReading,
                    setIsReading,
                    waitRef,
                    elemRef,
                    cards,
                    isKabbalah,
                }}
            />
        </div>
    );
}
