import "../../css/home.css";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../database.js";
import AskQuestion, { Separator } from "./AskQuestion";
import MemberBanner from "./MemberBanner";
import SignOut from "../SignOut";
import Subscribe from "./Subscribe/Subscribe";
import Social from "../Social";

export default function Home({
    custom,
    setIsSettings,
    setCustom,
    setCards,
    setIsCustom,
    setUser,
    user,
    cards,
    setIsTransition,
    setIsKabbalah,
    isKabbalah,
}) {
    return (
        <div
            id="home"
            className={`slide${user.emailVerified ? "" : " unverified"}`}
        >
            <div className="slide-container">
                <h1>Delfai Oracle</h1>
                {user.emailVerified ? (
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
                            }}
                        />
                        <Separator />
                        {user.paid || user.free_draws > 0 ? (
                            <AskQuestion
                                {...{
                                    user,
                                    setCards,
                                    setUser,
                                    setIsTransition,
                                    setIsKabbalah,
                                    isKabbalah,
                                }}
                            />
                        ) : (
                            <FreeTrialOver {...{ user }} />
                        )}
                    </>
                ) : (
                    <Unverified {...{ user }} />
                )}
            </div>
            <br />
            <br />
            <br />
            <br />
            <Social />
        </div>
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
