import TimeSlide from "./TimeSlide";

export default function Past({ card, elemRef, waitRef }) {
    return <TimeSlide {...{ card, timeframe: "Past", elemRef, waitRef }} />;
}
