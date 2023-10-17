import SignOut from "../SignOut";

export default function MemberBanner({ user, setIsSettings }) {
    return (
        <>
            <p className="description">
                A web app for Tarot lovers! Get instant readings for any
                question.
            </p>
            <div id="user-options">
                <button
                    className="link-btn"
                    onClick={() => setIsSettings((isSettings) => !isSettings)}
                >
                    settings
                </button>
                | <a href="/about">about</a> | <a href="/kabbalah">kabbalah</a>{" "}
                |
                <SignOut />
            </div>
            <p id="free-status">
                Hi, {user.email}! <br />
                {user.paid ? (
                    <>Thanks for being a paid member!</>
                ) : (
                    <>
                        You have {user.free_draws} free reading
                        {user.free_draws === 1 ? "" : "s"} left.
                    </>
                )}
            </p>
        </>
    );
}
