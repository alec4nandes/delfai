import CardImage from "./CardImage";
import NextButton from "./NextButton";

export default function TimeSlide({ card, timeframe, elemRef, waitRef }) {
    return (
        <div id={timeframe.toLowerCase()} className="slide">
            <div className="slide-container">
                <h2>{timeframe}</h2>
                <h3>{card}</h3>
                <CardImage {...{ card }} />
                <div className="wait" ref={waitRef}>
                    Reading... Please wait...
                </div>
                <div className="reading" ref={elemRef}></div>
                <NextButton />
            </div>
        </div>
    );
}
