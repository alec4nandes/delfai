import CardImage from "./CardImage";

export default function CardImages({ spread }) {
    return (
        <div id="card-images">
            {spread.map((card) => (
                <div className="card-info" key={`custom-card-${card.name}`}>
                    <CardImage card={card.name} />
                    <div className="card-name">{card.name}</div>
                    <div className="card-words">{card.words.join(", ")}</div>
                </div>
            ))}
        </div>
    );
}
