import { allSuitWords, getRankAndSuit } from "../../../compare/data.js";
import { kabbalahSuits } from "../../../kabbalah.js";
import { KabbalahLink } from "./MoreInfo";

export default function Suit({ card, isKabbalah }) {
    const { suit } = getRankAndSuit(card.name);
    return (
        suit &&
        (isKabbalah ? (
            <p>
                This card's suit of <strong>{suit}</strong> represents the
                element <strong>{kabbalahSuits[suit].element}</strong> and the
                world of <KabbalahLink name={kabbalahSuits[suit].name} /> on the
                Tree of Life.
            </p>
        ) : (
            <p>
                <strong>{suit}</strong> represent{" "}
                {allSuitWords[suit].join(" and ")}
            </p>
        ))
    );
}
