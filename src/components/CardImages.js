import CardImage from "./CardImage";
import Rank from "./Rank";
import Suit from "./Suit";

export default function CardImages({ spread }) {
    return (
        <div id="card-images">
            {spread.map((card) => {
                return (
                    <div className="card-info" key={`custom-card-${card.name}`}>
                        <CardImage card={card.name} />
                        <div className="card-name">{card.name}</div>
                        <div className="card-words">
                            {card.words.join(", ")}
                        </div>
                        <Rank {...{ card }} />
                        <Suit {...{ card }} />
                    </div>
                );
            })}
        </div>
    );
}

function getRankAndSuit(cardName) {
    let [rank, suit] =
        cardName.includes(" of ") && !cardName.includes("Wheel")
            ? cardName.split(" of ")
            : [];
    suit = suit?.replace(" reversed", "");
    return { rank, suit };
}

export { getRankAndSuit };
