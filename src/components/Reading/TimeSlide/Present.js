import TimeSlide from "./TimeSlide";

export default function Present({ card, elemRef, waitRef }) {
    return <TimeSlide {...{ card, timeframe: "Present", elemRef, waitRef }} />;
}
