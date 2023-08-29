import TimeSlide from "./TimeSlide";

export default function Present({ card, question, elemRef, waitRef }) {
    return (
        <TimeSlide
            {...{ card, timeframe: "Present", question, elemRef, waitRef }}
        />
    );
}
