import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../database.js";
import Home from "./Home/Home";
import Portal from "./Portal";
import SubscribePage from "./SubscribePage";

export default function App() {
    const [loaded, setLoaded] = useState(false),
        [isSubscribePage, setIsSubscribePage] = useState(false),
        [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            user && setUser(await getUserData(user));
            const urlParams = new URLSearchParams(window.location.search),
                pageParam = urlParams.get("page");
            setIsSubscribePage(pageParam === "subscribe");
            setLoaded(true);
        });

        async function getUserData(user) {
            const { email, emailVerified } = user || {};
            try {
                const data =
                    (await getDoc(doc(db, "users", email))).data() || {};
                return { email, emailVerified, ...data };
            } catch (err) {
                console.error(err);
                return null;
            }
        }
    }, []);

    return loaded ? (
        user ? (
            isSubscribePage ? (
                <SubscribePage {...{ user }} />
            ) : (
                <Home {...{ user, setUser }} />
            )
        ) : (
            <Portal />
        )
    ) : (
        <></>
    );
}
