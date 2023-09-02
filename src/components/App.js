import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../database.js";
import fillRef from "../display.js";
import Portal from "./Portal";
import Home from "./Home/Home.js";
import Spread from "./Reading/Spread.js";
import Past from "./Reading/TimeSlide/Past.js";
import Present from "./Reading/TimeSlide/Present.js";
import Future from "./Reading/TimeSlide/Future.js";
import Advice from "./Reading/Advice";
import NavBar from "./Reading/Navbar";

export default function App() {
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
