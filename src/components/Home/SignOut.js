import { signOut } from "firebase/auth";
import { auth } from "../../database.js";

export default function SignOut() {
    return (
        <button className="standard-btn" onClick={handleSignOut}>
            sign out
        </button>
    );

    function handleSignOut() {
        signOut(auth)
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.error(err);
                alert(err.message);
            });
    }
}
