import { allSuitWords } from "../compare/data.js";
import { getRankAndSuit } from "./CardImages";

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
