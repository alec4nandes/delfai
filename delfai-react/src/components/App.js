import { useRef, useState } from "react";
import Home from "./Home";
import Spread from "./Spread";
import Past from "./Past";
import Present from "./Present";
import Future from "./Future";
import Advice from "./Advice";
import NavBar from "./Navbar";

function App() {
    const [cards, setCards] = useState([]),
        [question, setQuestion] = useState(),
        pastRef = useRef(),
        presentRef = useRef(),
        futureRef = useRef(),
        adviceRef = useRef();

    const slides = [
        <Home {...{ setCards, setQuestion }} key="home" />,
        <Spread {...{ cards, question }} key="spread" />,
        <Past {...{ card: cards[0], question, elemRef: pastRef }} key="past" />,
        <Present
            {...{ card: cards[1], question, elemRef: presentRef }}
            key="present"
        />,
        <Future
            {...{ card: cards[2], question, elemRef: futureRef }}
            key="future"
        />,
        <Advice {...{ cards, elemRef: adviceRef }} key="advice" />,
    ];

    return (
        <>
            {cards.length ? <NavBar /> : <></>}
            <main onScroll={(e) => handleScroll(e)}>
                {cards.length ? slides.slice(1) : slides[0]}
            </main>
        </>
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
        console.log(id, left, screenWidth);
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
