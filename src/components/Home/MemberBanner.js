import CustomSelect from "../CustomSelect";
import SignOut from "../SignOut";

export default function MemberBanner({
    user,
    custom,
    setIsSettings,
    setIsCustom,
    setCustom,
    setCards,
    cards,
}) {
    return (
        <>
            <p className="description">
                Explore how the Tarot cards relate to each other. Delfai Oracle
                answers questions with three-card readings. Users can also enter
                their own spreads for deeper insight.
            </p>
            <div id="user-options">
                <button
                    className="link-btn"
                    onClick={() => setIsSettings((isSettings) => !isSettings)}
                >
                    settings
                </button>
                | <a href="/about">about</a> |
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
            {user.paid || user.free_draws > 0 ? (
                <CustomSelect
                    {...{
                        user,
                        cards,
                        setCards,
                        custom,
                        setCustom,
                        setIsCustom,
                    }}
                />
            ) : (
                <></>
            )}
        </>
    );
}
