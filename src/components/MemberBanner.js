import CustomSelect from "./Home/CustomSelect";
import SignOut from "./SignOut";
import Subscribe from "./Home/Stripe/Subscribe";

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
                        <p>Only paid users can enter custom spreads.</p>
                        <Subscribe {...{ user, hideSignOut: true }} />
                    </>
                )}
            </details>
        </>
    );
}
