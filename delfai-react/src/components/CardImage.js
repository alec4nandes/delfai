export default function CardImage({ card }) {
    return (
        <img
            className={`card-image ${
                card.includes(" reversed") ? "reversed" : ""
            }`}
            src={`/assets/cards/${card.replace(" reversed", "")}.jpg`}
            alt={card}
        />
    );
}
