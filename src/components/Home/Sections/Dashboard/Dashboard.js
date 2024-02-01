import { sendEmailVerification } from "firebase/auth";
import { IS_DEVELOPMENT, auth } from "../../../../database.js";
import MemberBanner from "./MemberBanner";
import SignOut from "../../SignOut.js";
import Footer from "../../../Footer.js";

export default function Dashboard({ user }) {
    return (
        <div className="container">
            <main>
                <div className="vertical-center">
                    <h1>Delfai Oracle</h1>
                    {!user.emailVerified ? (
                        <Unverified {...{ user }} />
                    ) : (
                        <>
                            <MemberBanner {...{ user }} />
                            <Separator />
                            <div>
                                <a
                                    href={
                                        IS_DEVELOPMENT
                                            ? "http://localhost:5000"
                                            : "/"
                                    }
                                    target="_blank"
                                    rel="noopener"
                                >
                                    About
                                </a>
                                &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                                <a
                                    href={`${
                                        IS_DEVELOPMENT
                                            ? "http://localhost:5000"
                                            : ""
                                    }/kabbalah`}
                                    target="_blank"
                                    rel="noopener"
                                >
                                    Kabbalah
                                </a>
                                &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                                <a
                                    href="/home/assets/wheel.png"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    Decan Wheel
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

function Unverified({ user }) {
    return (
        <>
            <p>
                Please verify your email by clicking the link sent to{" "}
                {user.email}
            </p>
            <div
                id="user-options"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    gap: "35px",
                }}
            >
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

function Separator() {
    return (
        <img
            className="separator"
            src="/home/assets/separator.png"
            alt="decorative dividing line made up of square swirls in the Greek style."
        />
    );
}

export { Separator };
