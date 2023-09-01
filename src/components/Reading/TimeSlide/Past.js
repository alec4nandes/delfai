import TimeSlide from "./TimeSlide";

export default function Past({ card, question, elemRef, waitRef }) {
    return (
        <TimeSlide
            {...{
                card,
                timeframe: "Past",
                question,
                elemRef,
                waitRef,
            }}
        />
    );
}
