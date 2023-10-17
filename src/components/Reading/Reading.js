import Advice from "./Advice";
import Future from "./TimeSlide/Future";
import NavBar from "./Navbar";
import Past from "./TimeSlide/Past";
import Present from "./TimeSlide/Present";
import Spread from "./Spread";

export default function Reading({
    cards,
    isKabbalah,
    pastRef,
    pastWaitRef,
    presentRef,
    presentWaitRef,
    futureRef,
    futureWaitRef,
    adviceRef,
    adviceWaitRef,
}) {
    return (
        <>
            <NavBar />
            <main onScroll={(e) => handleScroll(e)}>
                <Spread {...{ cards, isKabbalah, key: "spread" }} />,
                <Past
                    {...{
                        cards,
                        card: cards?.spread.past,
                        elemRef: pastRef,
                        waitRef: pastWaitRef,
                        isKabbalah,
                        key: "past",
                    }}
                />
                ,
                <Present
                    {...{
                        cards,
                        card: cards?.spread.present,
                        elemRef: presentRef,
                        waitRef: presentWaitRef,
                        isKabbalah,
                        key: "present",
                    }}
                />
                ,
                <Future
                    {...{
                        cards,
                        card: cards?.spread.future,
                        elemRef: futureRef,
                        waitRef: futureWaitRef,
                        isKabbalah,
                        key: "future",
                    }}
                />
                ,
                <Advice
                    {...{
                        elemRef: adviceRef,
                        waitRef: adviceWaitRef,
                        cards,
                        isKabbalah,
                        key: "advice",
                    }}
                />
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
