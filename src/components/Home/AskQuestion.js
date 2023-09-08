import { doc, updateDoc } from "@firebase/firestore";
import { db, apiRoot } from "../../database.js";
import ResetPassword from "../ResetPassword";
import Questions, { handleQuestion } from "./Questions";
import SignOut from "../SignOut";

export default function AskQuestion({ user, setCards, setUser }) {
    return (
        <>
            <div id="user-options">
                <Unsubscribe {...{ user }} />
                <ResetPassword email={user.email} />
                <SignOut />
            </div>
            <CustomQuestion {...{ setCards, setUser, user }} />
            <Questions {...{ setCards, setUser, user }} />
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

function CustomQuestion({ setCards, setUser, user }) {
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
                onSubmit={(e) => handleQuestion(e, setCards, setUser, user)}
            >
                <textarea
                    name="question"
                    placeholder="Ask a question (optional)..."
                ></textarea>
                <button className="standard-btn" type="submit">
                    ask
                </button>
            </form>
        </>
    );
}
