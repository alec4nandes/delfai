export default function Advice({ elemRef, waitRef }) {
    return (
        <div id="advice" className="slide">
            <div className="slide-container">
                <h2>Advice</h2>
                <div className="wait" ref={waitRef}>
                    Reading... Please wait...
                </div>
                <div className="reading" ref={elemRef}></div>
            </div>
        </div>
    );
}
