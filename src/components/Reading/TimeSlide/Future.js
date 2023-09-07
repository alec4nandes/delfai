import TimeSlide from "./TimeSlide";

export default function Future({ cards, card, elemRef, waitRef }) {
    return (
        <TimeSlide
            {...{ cards, card, timeframe: "Future", elemRef, waitRef }}
        />
    );
}
