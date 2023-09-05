import TimeSlide from "./TimeSlide";

export default function Future({ card, elemRef, waitRef }) {
    return <TimeSlide {...{ card, timeframe: "Future", elemRef, waitRef }} />;
}
