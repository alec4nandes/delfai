import TimeSlide from "./TimeSlide";

export default function Future({ cards, card, elemRef, waitRef, isKabbalah }) {
    return (
        <TimeSlide
            {...{
                cards,
                card,
                timeframe: "Future",
                elemRef,
                waitRef,
                isKabbalah,
            }}
        />
    );
}
