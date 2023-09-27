import { useCallback, useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../database.js";
import { allCards } from "../compare/data.js";
import { getSpread } from "../compare/spread.js";
import fillRef from "../display.js";
import Portal from "./Portal";
import Settings from "./Settings";
import Home from "./Home/Home";
import CustomReading from "./CustomReading";
import Spread from "./Reading/Spread";
import Past from "./Reading/TimeSlide/Past";
import Present from "./Reading/TimeSlide/Present";
import Future from "./Reading/TimeSlide/Future";
import Advice from "./Reading/Advice";
import NavBar from "./Reading/Navbar";
import Loading from "./Loading.js";

export default function App() {
    const [loaded, setLoaded] = useState(false),
        [user, setUser] = useState(null),
        [cards, setCards] = useState(),
        [isSettings, setIsSettings] = useState(false),
        [isCustom, setIsCustom] = useState(false),
        [custom, setCustom] = useState(getSpread().map(({ name }) => name)),
        [isTransition, setIsTransition] = useState(false),
        pastRef = useRef(),
        presentRef = useRef(),
        futureRef = useRef(),
        adviceRef = useRef(),
        customRef = useRef(),
        pastWaitRef = useRef(),
        presentWaitRef = useRef(),
        futureWaitRef = useRef(),
        adviceWaitRef = useRef(),
        customWaitRef = useRef();

    const getReading = useCallback(() => {
        if (!cards) {
            return;
        }
        if (isCustom) {
            fillRef(cards, "custom spread", customWaitRef, customRef, true);
        } else {
            const elemRefs = {
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
            Object.keys(elemRefs).forEach((timeframe) =>
                fillRef(
                    cards,
                    timeframe,
                    waitRefs[timeframe],
                    elemRefs[timeframe]
                )
            );
        }
    }, [cards, isCustom]);

    useEffect(() => {
        if (isTransition) {
            setTimeout(() => {
                setIsTransition(false);
                getReading();
            }, 1950);
        }
    }, [getReading, isTransition]);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            user && setUser(await getUserData(user));
            setLoaded(true);
        });

        preloadCardImages();

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

        function preloadCardImages() {
            Object.keys(allCards).forEach(
                (cardName) => new Image(`/assets/cards/${cardName}.jpg`)
            );
        }
    }, []);

    const slides = [
        <Spread {...{ cards, key: "spread" }} />,
        <Past
            {...{
                cards,
                card: cards?.spread.past,
                elemRef: pastRef,
                waitRef: pastWaitRef,
                key: "past",
            }}
        />,
        <Present
            {...{
                cards,
                card: cards?.spread.present,
                elemRef: presentRef,
                waitRef: presentWaitRef,
                key: "present",
            }}
        />,
        <Future
            {...{
                cards,
                card: cards?.spread.future,
                elemRef: futureRef,
                waitRef: futureWaitRef,
                key: "future",
            }}
        />,
        <Advice
            {...{
                elemRef: adviceRef,
                waitRef: adviceWaitRef,
                cards,
                key: "advice",
            }}
        />,
    ];

    return loaded ? (
        <>
            <Loading {...{ loaded, isTransition }} />
            {user ? (
                isTransition ? (
                    <></>
                ) : isSettings ? (
                    <Settings {...{ user }} />
                ) : isCustom ? (
                    <CustomReading
                        {...{
                            cards,
                            customWaitRef,
                            customRef,
                            custom,
                            setCustom,
                            setCards,
                            setIsCustom,
                            user,
                            setIsTransition,
                        }}
                    />
                ) : (
                    <>
                        {cards ? <NavBar /> : <></>}
                        <main onScroll={(e) => handleScroll(e)}>
                            {cards ? (
                                slides
                            ) : (
                                <Home
                                    {...{
                                        custom,
                                        setIsSettings,
                                        setCustom,
                                        setCards,
                                        setIsCustom,
                                        setUser,
                                        user,
                                        cards,
                                        setIsTransition,
                                    }}
                                />
                            )}
                        </main>
                    </>
                )
            ) : (
                <Portal />
            )}
        </>
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
            // 20px buffer
            isShowing = -20 <= left && left < screenWidth - 20;
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
