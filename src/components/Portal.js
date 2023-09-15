import "../css/sign-in.css";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { IS_DEVELOPMENT, auth, db } from "../database.js";
import ResetPassword from "./ResetPassword";

export default function Portal() {
    const [errorMessage, setErrorMessage] = useState(""),
        [loginEmail, setLoginEmail] = useState(""),
        formRef = useRef(),
        clickCallback = useCallback(async function (e) {
            const { id } = e.target;
            if (id === "sign-in-btn") {
                await handleSignIn(e);
            } else if (id === "sign-up-btn") {
                await handleSignUp(e);
            }
            return;

            async function handleSignIn(e) {
                e.preventDefault();
                const { email, password } = getFormData();
                return signInWithEmailAndPassword(auth, email, password)
                    .then((result) => result)
                    .catch((error) => {
                        const { code, message } = error;
                        console.error(code);
                        setErrorMessage(
                            message.includes("auth/wrong-password")
                                ? "That password is incorrect."
                                : message.includes("auth/user-not-found")
                                ? "That email doesn't have an account. Please try signing up."
                                : message
                        );
                    });
            }

            async function handleSignUp(e) {
                e.preventDefault();
                const { email, password } = getFormData();
                try {
                    const { user } = await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );
                    await sendEmailVerification(user, {
                        url: IS_DEVELOPMENT
                            ? "http://localhost:3000"
                            : "https://delfai.web.app",
                    });
                    await setDoc(doc(db, "users", email), {
                        paid: false,
                        free_draws: 5,
                    });
                } catch (error) {
                    const { message } = error;
                    console.error(error);
                    setErrorMessage(
                        message.includes("auth/email-already-in-use")
                            ? "That email already has an account. Try signing in instead."
                            : message
                    );
                }
            }
        }, []);

    useEffect(() => {
        document.addEventListener("click", clickCallback);
        return () => document.removeEventListener("click", clickCallback);
    }, [clickCallback]);

    function getFormData() {
        return Object.fromEntries(new FormData(formRef.current));
    }

    return (
        <div id="sign-in">
            <h1>Delfai Oracle</h1>
            <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
                <h2>Enter</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="email">email:</label>
                            </td>
                            <td>
                                <input
                                    name="email"
                                    type="email"
                                    id="email"
                                    onChange={(e) =>
                                        setLoginEmail(e.target.value)
                                    }
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="password">password:</label>
                            </td>
                            <td>
                                <input
                                    name="password"
                                    type="password"
                                    id="password"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div id="user-options">
                                    <button
                                        id="sign-up-btn"
                                        className="standard-btn"
                                    >
                                        sign up
                                    </button>
                                    <button
                                        id="sign-in-btn"
                                        className="standard-btn"
                                    >
                                        sign in instead
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p id="sign-in-error">{errorMessage}</p>
            </form>
            <ResetPassword email={loginEmail} />
        </div>
    );
}
