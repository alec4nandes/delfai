export default function CardImage({ card }) {
    return (
        <img
            className="card-image"
            src={`/assets/cards/${card.replace(" reversed", "")}.jpg`}
            alt={card}
        />
    );
}
