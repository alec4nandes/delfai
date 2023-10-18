import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../../../database.js";
import MemberBanner from "./MemberBanner";
import SignOut from "../../SignOut.js";
import Subscribe from "../../Subscribe/Subscribe.js";
import Social from "../../../Social.js";

export default function Dashboard({ user }) {
    return (
        <div className="container">
            <h1>Delfai Oracle</h1>
            {!user.emailVerified ? (
                <Unverified {...{ user }} />
            ) : (
                <>
                    <MemberBanner {...{ user }} />
                    <Separator />
                    <div>
                        <a href="/about" target="_blank" rel="noopener">
                            About
                        </a>
                        &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="/kabbalah" target="_blank" rel="noopener">
                            Kabbalah
                        </a>
                        &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                        <a
                            href="/assets/wheel.png"
                            target="_blank"
                            rel="noopener"
                        >
                            Decan Wheel
                        </a>
                    </div>
                    <Separator />
                    {!(user.paid || user.free_draws > 0) && (
                        <FreeTrialOver {...{ user }} />
                    )}
                </>
            )}
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
