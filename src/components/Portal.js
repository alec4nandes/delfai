import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../database.js";
import ResetPassword from "./ResetPassword.js";

export default function Portal() {
    const [hasAccount, setHasAccount] = useState(false),
        [errorMessage, setErrorMessage] = useState(""),
        [loginEmail, setLoginEmail] = useState("");

    return (
        <div id="sign-in">
            <form onSubmit={hasAccount ? handleSignIn : handleSignUp}>
                <h1>Sign {hasAccount ? "In" : "Up"}</h1>
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
                            <td></td>
                            <td>
                                <button className="standard-btn">
                                    sign {hasAccount ? "in" : "up"}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p id="sign-in-error">{errorMessage}</p>
            </form>
            <div id="user-options">
                {hasAccount ? <ResetPassword email={loginEmail} /> : <></>}
                <button
                    className="standard-btn"
                    onClick={() => setHasAccount((bool) => !bool)}
                >
                    sign {hasAccount ? "up" : "in"} instead
                </button>
            </div>
        </div>
    );

    function handleSignIn(e) {
        e.preventDefault();
        let { email, password } = e.target;
        email = email.value;
        password = password.value;
        signInWithEmailAndPassword(auth, email, password)
            .then()
            .catch((error) => {
                const { code, message } = error;
                console.error(code);
                setErrorMessage(message);
            });
    }

    async function handleSignUp(e) {
        e.preventDefault();
        let { email, password } = e.target;
        email = email.value;
        password = password.value;
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
            setErrorMessage(message);
        }
    }
}
