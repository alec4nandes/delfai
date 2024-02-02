import Footer from "../../../Footer";
import ResetPassword from "../../../ResetPassword";
import SignOut from "../../SignOut";

export default function Settings({ user }) {
    return (
        <div className="container">
            <main>
                <div className="vertical-center">
                    <h2 className="bigger-header">Account</h2>
                    <ResetPassword email={user.email} />
                    <SignOut />
                </div>
            </main>
            <Footer />
        </div>
    );
}
