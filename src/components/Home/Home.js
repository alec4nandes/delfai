import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../database.js";
import AskQuestion from "./AskQuestion";
import Subscribe from "./Stripe/Subscribe.js";
import SignOut from "../SignOut.js";

export default function Home({ setCards, setQuestion, setUser, user }) {
    return (
        <div id="home" className="slide">
            <div className="slide-container">
                <h1>Delfai Oracle</h1>
                {user.emailVerified ? (
                    user.paid || user.free_draws > 0 ? (
                        <AskQuestion
                            {...{ user, setCards, setQuestion, setUser }}
                        />
                    ) : (
                        <FreeTrialOver {...{ user }} />
                    )
                ) : (
                    <Unverified {...{ user }} />
                )}
            </div>
        </div>
    );
}

function FreeTrialOver({ user }) {
    return (
        <>
            <p>
                Oh no! You're out of free readings. Please consider registering
                for a paid account for only $2.99 a month!
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
                <SignOut />
            </div>
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