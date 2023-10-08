import { getRankWords, getRankAndSuit } from "../../compare/data.js";
import { sefirot } from "../../kabbalah.js";

export default function Rank({ card, isKabbalah }) {
    const { rank } = getRankAndSuit(card.name);
    if (!rank) {
        return;
    }
    if (isKabbalah) {
        const { sefira, world } = sefirot[rank],
            link = (
                <a
                    href={getKabUrl(sefira || world)}
                    target="_blank"
                    rel="noopener"
                >
                    {sefira || world}
                </a>
            );

        return sefira ? (
            <p>
                This card's rank of <strong>{rank}</strong> represents the
                sephira <strong>{link}</strong> on the Tree of Life.
            </p>
        ) : (
            <p>
                This card's court rank of <strong>{rank}</strong> represents the{" "}
                <strong>{link}</strong> on the Tree of Life.
            </p>
        );
    }
    const isReversed = card.name.includes(" reversed"),
        rankWords = getRankWords(rank, isReversed);
    return (
        <p>
            <strong>
                {rank}
                {isNaN(+rank) ? "" : "'"}s
                {isReversed && rankWords.length ? " reversed" : ""}
            </strong>{" "}
            {rankWords.length ? "" : "normally "}represent{" "}
            {getRankWords(rank, rankWords.length ? isReversed : false).join(
                ", "
            )}
        </p>
    );
}

function getKabUrl(str) {
    str = str.includes("World") ? str.split("(")[1].replace(")", "") : str;
    return `/kabbalah/#${str.toLowerCase()}`;
}

export { getKabUrl };
