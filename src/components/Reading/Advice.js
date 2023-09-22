import { getCardsId } from "../CustomReading";

export default function Advice({ elemRef, waitRef, cards }) {
    return (
        <div id="advice" className="slide">
            <div className="slide-container">
                <h2 className="bigger-header">Advice</h2>
                <div className="wait" ref={waitRef}>
                    Reading... Please wait...
                </div>
                <div
                    id={getCardsId(cards)}
                    className="reading"
                    ref={elemRef}
                ></div>
                <button
                    className="standard-btn"
                    onClick={() => window.location.reload()}
                >
                    go home
                </button>
            </div>
        </div>
    );
}
