import "../css/sign-in.css";
import { useRef, useState } from "react";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../database.js";
import ResetPassword from "./ResetPassword";

export default function Portal() {
    const [errorMessage, setErrorMessage] = useState(""),
        [loginEmail, setLoginEmail] = useState(""),
        formRef = useRef();

    document.addEventListener("click", async (e) => {
        const { id } = e.target;
        if (id === "sign-in-btn") {
            await handleSignIn(e);
        } else if (id === "sign-up-btn") {
            await handleSignUp(e);
        }
    });

    function getFormData() {
        return Object.fromEntries(new FormData(formRef.current));
    }

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
            await sendEmailVerification(user);
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
