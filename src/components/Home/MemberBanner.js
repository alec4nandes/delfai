import CustomSelect from "./CustomSelect";
import Subscribe from "./Subscribe/Subscribe";
import SignOut from "../SignOut";

export default function MemberBanner({
    user,
    custom,
    setIsSettings,
    setIsCustom,
    setCustom,
    setCards,
}) {
    return (
        <>
            <p className="description">
                Explore how Tarot cards relate to each other. Delfai Oracle
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
                |
                <SignOut />
            </div>
            <p id="free-status">
                Hi, {user.email}!{" "}
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
                <details>
                    <summary className="standard-btn">
                        Enter a Custom Spread
                    </summary>
                    {user.paid ? (
                        <CustomSelect
                            {...{
                                custom,
                                setCustom,
                                setCards,
                                setIsCustom,
                            }}
                        />
                    ) : (
                        <>
                            <p>
                                Only paid members can enter custom spreads.
                                Please consider joining for only $2.99 a month.
                            </p>
                            <Subscribe {...{ user }} />
                        </>
                    )}
                </details>
            ) : (
                <></>
            )}
        </>
    );
}
