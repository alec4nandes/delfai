export default function AgeLocationVerify({ cookieKey, setHasAgeCookie }) {
    return (
        <div id="verify-age-location">
            <div id="verify-container">
                <h1>Delfai Oracle</h1>
                <h2>Tarot Card Readings</h2>
                <p>
                    This website is restricted to people aged 18+ and living in
                    areas where Tarot card reading and related activities are
                    not explicitly banned. By clicking “Enter” you are agreeing
                    to these terms.
                </p>
                <div id="verify-buttons">
                    <button
                        className="standard-btn"
                        onClick={() => {
                            // add age & location verification cookie
                            document.cookie = `${cookieKey}=1`;
                            setHasAgeCookie(true);
                        }}
                    >
                        ENTER
                    </button>
                    <button
                        className="standard-btn"
                        onClick={() =>
                            (window.location.href = "https://google.com")
                        }
                    >
                        LEAVE
                    </button>
                </div>
            </div>
        </div>
    );
}
