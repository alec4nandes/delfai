import TimeSlide from "./TimeSlide";

export default function Present({ cards, card, elemRef, waitRef }) {
    return (
        <TimeSlide
            {...{ cards, card, timeframe: "Present", elemRef, waitRef }}
        />
    );
}
