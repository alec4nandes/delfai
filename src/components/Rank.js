import { getRankWords } from "../compare/data.js";
import { getRankAndSuit } from "./CardImages";

export default function Rank({ card }) {
    const { rank } = getRankAndSuit(card.name),
        isReversed = card.name.includes(" reversed"),
        rankWords = getRankWords(rank, isReversed);
    return (
        rank && (
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
        )
    );
}
