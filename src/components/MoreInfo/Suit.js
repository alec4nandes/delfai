import { allSuitWords, getRankAndSuit } from "../../compare/data.js";
import { suits } from "../../kabbalah.js";
import { getKabUrl } from "./Rank.js";

export default function Suit({ card, isKabbalah }) {
    const { suit } = getRankAndSuit(card.name);
    return (
        suit &&
        (isKabbalah ? (
            <p>
                This card's suit of <strong>{suit}</strong> represents the
                element <strong>{suits[suit].element}</strong> and the{" "}
                <a
                    href={getKabUrl(suits[suit].world)}
                    target="_blank"
                    rel="noopener"
                >
                    <strong>{suits[suit].world}</strong>
                </a>{" "}
                on the Tree of Life.
            </p>
        ) : (
            <p>
                <strong>{suit}</strong> represent{" "}
                {allSuitWords[suit].join(" and ")}
            </p>
        ))
    );
}
