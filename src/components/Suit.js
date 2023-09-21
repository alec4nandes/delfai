import { allSuitWords, getRankAndSuit } from "../compare/data.js";

export default function Suit({ card }) {
    const { suit } = getRankAndSuit(card.name);
    return (
        suit && (
            <p>
                <strong>{suit}</strong> represent{" "}
                {allSuitWords[suit].join(" and ")}
            </p>
        )
    );
}
