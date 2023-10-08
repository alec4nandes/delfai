import CardImage from "./CardImage";
import MoreInfo from "./MoreInfo/MoreInfo";

export default function CardImages({ spread, isKabbalah }) {
    return (
        <div id="card-images">
            {spread.map((card) => (
                <div className="card-info" key={`custom-card-${card.name}`}>
                    <CardImage card={card.name} />
                    <div className="card-name">{card.name}</div>
                    <div className="card-words">{card.words.join(", ")}</div>
                    <MoreInfo {...{ card, isKabbalah }} />
                </div>
            ))}
        </div>
    );
}
