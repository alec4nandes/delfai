export default function MemberBanner({ user }) {
    return (
        <>
            <p className="description">
                A web app for Tarot lovers! Get instant readings for any
                question.
            </p>
            <p id="free-status">
                Hi, {user.email}!{/* <br /> */}
                {
                    /* NO MORE PAYWALL: */
                    false &&
                        (user.paid ? (
                            <>Thanks for being a paid member!</>
                        ) : (
                            <>
                                You have {user.free_draws} free reading
                                {user.free_draws === 1 ? "" : "s"} left.
                            </>
                        ))
                }
            </p>
        </>
    );
}
