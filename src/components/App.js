import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../database.js";
import Home from "./Home/Home";
import Portal from "./Portal";
import AgeLocationVerify from "./AgeLocationVerify.js";

const cookieKey = "age_location_verified";

export default function App() {
    const [loaded, setLoaded] = useState(false),
        [hasAgeCookie, setHasAgeCookie] = useState(false),
        [user, setUser] = useState(null);

    // VERIFY AGE AND LOCATION
    useEffect(() => {
        // check cookie
        const cookieData = parseCookie(document.cookie),
            userVerified = !!+cookieData[cookieKey];
        userVerified && setHasAgeCookie(true);
        console.log("user verified:", userVerified);

        // https://www.geekstrick.com/snippets/how-to-parse-cookies-in-javascript/
        // cookie in browser: `pkg=math; equation=E%3Dmc%5E2`
        // parsed: { pkg: 'math', equation: 'E=mc^2' }
        function parseCookie(str) {
            return str
                .split(";")
                .map((v) => v.split("="))
                .reduce((acc, v) => {
                    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(
                        v[1].trim()
                    );
                    return acc;
                }, {});
        }
    }, []);

    // CHECK USER LOGIN STATUS
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            user && setUser(await getUserData(user));
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

    return (
        <>
            {loaded && !hasAgeCookie && (
                <AgeLocationVerify {...{ cookieKey, setHasAgeCookie }} />
            )}
            {loaded ? (
                user ? (
                    <Home {...{ user, setUser }} />
                ) : (
                    <Portal />
                )
            ) : (
                <></>
            )}
        </>
    );
}
