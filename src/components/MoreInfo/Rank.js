import { getRankWords, getRankAndSuit } from "../../compare/data.js";
import { kabbalahRanks } from "../../kabbalah.js";

export default function Rank({ card, isKabbalah }) {
    const { rank } = getRankAndSuit(card.name);
    if (!rank) {
        return;
    }
    if (isKabbalah) {
        const { sefira, world } = kabbalahRanks[rank],
            link = <KabbalahLink name={(sefira || world).name} />;

        return sefira ? (
            <p>
                This card's rank of <strong>{rank}</strong> represents the
                sefira <strong>{link}</strong> on the Tree of Life.
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

function KabbalahLink({ name }) {
    return (
        <a href={getKabUrl(name)} target="_blank" rel="noopener">
            {name}
        </a>
    );

    function getKabUrl(str) {
        return `/kabbalah/#${str.toLowerCase()}`;
    }
}

export { KabbalahLink };
