import { doc, updateDoc } from "@firebase/firestore";
import { db, apiRoot } from "../../../../database.js";
import ResetPassword from "../../../ResetPassword";
import SignOut from "../../SignOut";

export default function Settings({ user }) {
    return (
        <div className="container">
            <h2 className="bigger-header">User Settings</h2>
            <ResetPassword email={user.email} />
            <Unsubscribe {...{ user }} />
            <SignOut />
        </div>
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