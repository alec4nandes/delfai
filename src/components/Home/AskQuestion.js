import { doc, updateDoc } from "@firebase/firestore";
import { db, apiRoot } from "../../database.js";
import SignOut from "../SignOut.js";
import Questions, { handleQuestion } from "./Questions";

export default function AskQuestion({ user, setCards, setQuestion, setUser }) {
    return (
        <>
            <p id="free-status">
                Hi, {user.email}!{" "}
                {user.paid ? (
                    <>Thanks for being a paid member!</>
                ) : (
                    <>
                        You have {user.free_draws} free reading
                        {user.free_draws === 1 ? "" : "s"} left.
                    </>
                )}
            </p>
            <div id="user-options">
                <Unsubscribe {...{ user }} />
                <SignOut />
            </div>
            <CustomQuestion {...{ setCards, setQuestion, setUser, user }} />
            <Questions {...{ setCards, setQuestion, setUser, user }} />
        </>
    );
}

function Unsubscribe({ user }) {
    return user.paid ? (
        <button
            className="standard-btn"
            onClick={() => handleUnsubscribe(user)}
        >
            unsubscribe
        </button>
    ) : (
        <></>
    );

    function handleUnsubscribe(user) {
        if (
            window.confirm(
                "Are you sure you want to unsubscribe? This takes effect immediately."
            )
        ) {
            const { subscriptionId } = user;
            fetch(`${apiRoot}/payment/unsubscribe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ subscriptionId }),
            })
                .then((resp) => resp.json())
                .then(async ({ confirm }) => {
                    try {
                        await updateDoc(doc(db, "users", user.email), {
                            free_draws: 5,
                            paid: false,
                        });
                        if (confirm) {
                            alert("Successfully unsubscribed.");
                            window.location.reload();
                            return;
                        }
                    } catch (err) {
                        console.error(err);
                    }
                    alert("Error unsubscribing. Please try again.");
                });
        }
    }
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
