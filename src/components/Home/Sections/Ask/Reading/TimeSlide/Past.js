import TimeSlide from "./TimeSlide";

export default function Past({ cards, card, elemRef, waitRef, isKabbalah }) {
    return (
        <TimeSlide
            {...{
                cards,
                card,
                timeframe: "Past",
                elemRef,
                waitRef,
                isKabbalah,
            }}
        />
    );
}
