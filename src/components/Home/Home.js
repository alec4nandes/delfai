import { useEffect } from "react";
import { allCards } from "../../compare/data.js";
import Ask from "./Sections/Ask/Ask";
import Dashboard from "./Sections/Dashboard/Dashboard";
import Decan from "./Sections/Decan/Decan";
import NavBar from "./Navbar";
import Settings from "./Sections/Account/Settings";

export default function Home({ user, setUser }) {
    useEffect(() => {
        preloadCardImages();

        function preloadCardImages() {
            Object.keys(allCards).forEach((cardName) => {
                const img = new Image();
                img.src = `/assets/cards/${cardName}.jpg`;
            });
        }
    }, []);

    return (
        <>
            <NavBar {...{ isHome: true, user }} />
            <div
                id="home"
                onScroll={(e) =>
                    handleScroll(
                        e,
                        [
                            "dashboard",
                            (user.paid || user.free_draws > 0) && "ask",
                            "decan",
                            "account",
                        ].filter(Boolean)
                    )
                }
            >
                <section id="dashboard">
                    <Dashboard {...{ user }} />
                </section>
                <section id="ask">
                    <Ask {...{ user, setUser }} />
                </section>
                <section id="decan">
                    <Decan {...{ user }} />
                </section>
                <section id="account">
                    <Settings {...{ user }} />
                </section>
            </div>
        </>
    );
}

function handleScroll(e, ids, isReadingSlide) {
    const getElem = (id) => document.querySelector(`#${id}`);
    ids.forEach((id) => {
        const elem = getElem(id),
            left =
                elem.offsetLeft -
                e.target.scrollLeft -
                (isReadingSlide ? e.target.parentElement.offsetLeft : 0),
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

export { handleScroll };
