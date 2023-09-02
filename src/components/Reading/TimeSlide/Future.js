import TimeSlide from "./TimeSlide";

export default function Future({ card, question, elemRef, waitRef }) {
    return (
        <TimeSlide
            {...{ card, timeframe: "Future", question, elemRef, waitRef }}
        />
    );
}
