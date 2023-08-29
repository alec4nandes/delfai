import { doc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../database.js";
import Questions, { handleQuestion } from "./Questions";

export default function Home({ setCards, setQuestion, setUser, user }) {
    return (
        <div id="home" className="slide">
            <div className="slide-container">
                <h1>Delfai</h1>
                {user.paid.active || user.free_draws > 0 ? (
                    <>
                        <p id="free-status">
                            Hi, {user.email}!{" "}
                            {user.paid.active ? (
                                <>Thanks for being a paid member!</>
                            ) : (
                                <>
                                    You have {user.free_draws} free reading
                                    {user.free_draws === 1 ? "" : "s"} left.
                                </>
                            )}
                        </p>
                        <SignOut />
                        <CustomQuestion
                            {...{ setCards, setQuestion, setUser, user }}
                        />
                        <Questions
                            {...{ setCards, setQuestion, setUser, user }}
                        />
                    </>
                ) : (
                    <>
                        <p>
                            Oh no! You're out of free readings. Please consider
                            registering for a paid account for only $2.99 a
                            month!
                        </p>
                        <button
                            id="register-button"
                            className="standard-btn"
                            onClick={() => handleRegister(user)}
                        >
                            REGISTER NOW
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

function SignOut() {
    return (
        <button
            className="standard-btn"
            onClick={() => {
                signOut(auth)
                    .then(() => {
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.error(err);
                        alert(err.message);
                    });
            }}
        >
            sign out
        </button>
    );
}

function CustomQuestion({ setCards, setQuestion, setUser, user }) {
    return (
        <>
            <h2>Ask the Tarot cards a question:</h2>
            <p>
                <em>Please keep in mind while writing your question:</em>
                <br />
                These cards serve as a wellspring for personal introspection,
                rather than a means to definitively ascertain outcomes.
            </p>
            <form
                id="custom"
                onSubmit={(e) =>
                    handleQuestion(e, setCards, setQuestion, setUser, user)
                }
            >
                <textarea name="question"></textarea>
                <button className="standard-btn" type="submit">
                    ask
                </button>
            </form>
        </>
    );
}

async function handleRegister(user) {
    if (window.confirm("Are you sure you want to join?")) {
        try {
            await setDoc(doc(db, "paid", user.email), {
                active: true,
            });
            alert("Successfully registered!");
            window.location.reload();
        } catch (err) {
            alert(err.message);
        }
    }
}
