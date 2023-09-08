import CardImages from "./CardImages";
import Compare from "./Reading/Compare/Compare";

export default function Custom({ cards, customWaitRef, customRef }) {
    return (
        <div id="custom-spread-reading">
            <h1>Delfai Oracle</h1>
            <h2>Custom Spread</h2>
            <CardImages spread={cards.spread} />
            <br />
            <Compare {...cards} />
            <div className="wait" ref={customWaitRef}>
                <br />
                Reading... Please wait...
            </div>
            <br />
            <div className="reading" ref={customRef}></div>
            <br />
            <button
                className="standard-btn"
                onClick={() => window.location.reload()}
            >
                new spread
            </button>
            <br />
        </div>
    );
}
