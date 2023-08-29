import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../database.js";
import fillRef from "../display.js";
import Portal from "./Portal";
import Home from "./Home";
import Spread from "./Spread";
import Past from "./Past";
import Present from "./Present";
import Future from "./Future";
import Advice from "./Advice";
import NavBar from "./Navbar";

function App() {
    const [loaded, setLoaded] = useState(false),
        [user, setUser] = useState(null),
        [cards, setCards] = useState([]),
        [question, setQuestion] = useState(),
        pastRef = useRef(),
        presentRef = useRef(),
        futureRef = useRef(),
        adviceRef = useRef(),
        pastWaitRef = useRef(),
        presentWaitRef = useRef(),
        futureWaitRef = useRef(),
        adviceWaitRef = useRef();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            setUser(await getUserData(user?.email));
            setLoaded(true);
        });

        async function getUserData(email) {
            try {
                const paid =
                        (await getDoc(doc(db, "paid", email))).data() || {},
                    data = (await getDoc(doc(db, "users", email))).data();
                return { email, paid, ...data };
            } catch (err) {
                console.error(err);
                return null;
            }
        }
    }, []);

    useEffect(() => {
        const refs = {
                past: pastRef,
                present: presentRef,
                future: futureRef,
                advice: adviceRef,
            },
            waitRefs = {
                past: pastWaitRef,
                present: presentWaitRef,
                future: futureWaitRef,
                advice: adviceWaitRef,
            };
        cards.length &&
            Object.keys(refs).forEach((id, i) => {
                const isAdvice = id === "advice";
                fillRef(
                    id,
                    !isAdvice && cards[i],
                    question,
                    refs[id],
                    isAdvice && cards,
                    waitRefs[id]
                );
            });
    }, [cards, question]);

    const slides = [
        <Home {...{ setCards, setQuestion, setUser, user, key: "home" }} />,
        <Spread {...{ cards, question, key: "spread" }} />,
        <Past
            {...{
                card: cards[0],
                question,
                elemRef: pastRef,
                waitRef: pastWaitRef,
                key: "past",
            }}
        />,
        <Present
            {...{
                card: cards[1],
                question,
                elemRef: presentRef,
                waitRef: presentWaitRef,
                key: "present",
            }}
        />,
        <Future
            {...{
                card: cards[2],
                question,
                elemRef: futureRef,
                waitRef: futureWaitRef,
                key: "future",
            }}
        />,
        <Advice
            {...{
                cards,
                elemRef: adviceRef,
                waitRef: adviceWaitRef,
                key: "advice",
            }}
        />,
    ];

    return loaded ? (
        user ? (
            <>
                {cards.length ? <NavBar /> : <></>}
                <main onScroll={(e) => handleScroll(e)}>
                    {cards.length ? slides.slice(1) : slides[0]}
                </main>
            </>
        ) : (
            <Portal />
        )
    ) : (
        <></>
    );
}

function handleScroll(e) {
    const ids = ["spread", "past", "present", "future", "advice"],
        getElem = (id) => document.querySelector(`#${id}`);
    ids.forEach((id) => {
        const elem = getElem(id),
            left = elem.offsetLeft - e.target.scrollLeft,
            screenWidth = window.innerWidth,
            isShowing = -1 <= left && left < screenWidth;
        if (isShowing) {
            const getNavItem = (id) => getElem(`nav-${id}`),
                navItems = ids.map(getNavItem),
                navItem = getNavItem(id);
            navItems.forEach((ni) =>
                ni.classList[ni === navItem ? "add" : "remove"]("highlighted")
            );
        }
    });
}

export default App;
