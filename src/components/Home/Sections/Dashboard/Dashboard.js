import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../../../database.js";
import AskQuestion from "../Ask/AskQuestion.js";
import MemberBanner from "./MemberBanner.js";
import OtherQuestions from "../Ask/OtherQuestions.js";
import SignOut from "../../SignOut.js";
import Subscribe from "../../Subscribe/Subscribe.js";
import Social from "../../../Social.js";

export default function Dashboard({
    user,
    setUser,
    custom,
    setIsSettings,
    setIsCustom,
    setCustom,
    setCards,
    cards,
    setIsTransition,
    setIsKabbalah,
    isKabbalah,
    setIsDecan,
    waitRef,
}) {
    return (
        <main>
            <div
                id="home"
                className={`slide${user.emailVerified ? "" : " unverified"}`}
            >
                <div className="slide-container">
                    <h1>Delfai Oracle</h1>
                    {!user.emailVerified ? (
                        <Unverified {...{ user }} />
                    ) : (
                        <>
                            <MemberBanner
                                {...{
                                    user,
                                    custom,
                                    setIsSettings,
                                    setIsCustom,
                                    setCustom,
                                    setCards,
                                    cards,
                                    setIsTransition,
                                    setIsKabbalah,
                                    isKabbalah,
                                    setIsDecan,
                                }}
                            />
                            {user.paid || user.free_draws > 0 ? (
                                <>
                                    <button
                                        className="standard-btn"
                                        onClick={() => {
                                            setIsTransition(true);
                                            setIsDecan(true);
                                        }}
                                    >
                                        Card of the Day
                                    </button>
                                    <Separator />
                                    <AskQuestion
                                        {...{
                                            user,
                                            setUser,
                                            cards,
                                            setCards,
                                            custom,
                                            setCustom,
                                            setIsTransition,
                                            setIsKabbalah,
                                            isKabbalah,
                                        }}
                                    />
                                    <Separator />
                                    <OtherQuestions
                                        {...{
                                            setCards,
                                            setUser,
                                            user,
                                            setIsTransition,
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <Separator />
                                    <FreeTrialOver {...{ user }} />
                                </>
                            )}
                        </>
                    )}
                    <br />
                    <br />
                    <Social />
                </div>
            </div>
        </main>
    );
}

function FreeTrialOver({ user }) {
    return (
        <>
            <p>
                Oh no! You're out of free readings. Please consider joining for
                only $2.99 a month.
            </p>
            <Subscribe {...{ user }} />
        </>
    );
}

function Unverified({ user }) {
    return (
        <>
            <p>
                Please verify your email by clicking the link sent to{" "}
                {user.email}
            </p>
            <div id="user-options">
                <ResendVerify />
                <button
                    className="standard-btn"
                    onClick={() => window.location.reload()}
                >
                    refresh page
                </button>
            </div>
            <SignOut />
        </>
    );

    function ResendVerify() {
        return (
            <button className="standard-btn" onClick={handleResendVerify}>
                resend verification email
            </button>
        );

        async function handleResendVerify() {
            try {
                await sendEmailVerification(auth.currentUser);
                alert("Email sent.");
            } catch (err) {
                console.error(err);
                alert(
                    "Could not send email. Please try again and contact al@fern.haus if problem persists."
                );
            }
        }
    }
}

function Separator() {
    return (
        <img
            className="separator"
            src="/assets/separator.png"
            alt="decorative dividing line made up of square swirls in the Greek style."
        />
    );
}

export { Separator };
