import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../database.js";

export default function Portal() {
    const [hasAccount, setHasAccount] = useState(false),
        [errorMessage, setErrorMessage] = useState("");

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
                            <td colSpan="2">
                                <button className="standard-btn">
                                    sign {hasAccount ? "in" : "up"}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p id="sign-in-error">{errorMessage}</p>
            </form>
            <button
                className="standard-btn"
                onClick={() => setHasAccount((bool) => !bool)}
            >
                sign {hasAccount ? "up" : "in"} instead
            </button>
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
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => setDoc(doc(db, "users", email), { free_draws: 5 }))
            .catch((error) => {
                const { code, message } = error;
                console.error(code);
                setErrorMessage(message);
            });
    }
}