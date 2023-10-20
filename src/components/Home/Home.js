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
                img.src = `/home/assets/cards/${cardName}.jpg`;
            });
        }
    }, []);

    return (
        <>
            <NavBar {...{ isHome: true, user }} />
            <div id="home">
                <section id="dashboard" className="main-and-footer">
                    <Dashboard {...{ user }} />
                </section>
                <section id="ask">
                    <Ask {...{ user, setUser }} />
                </section>
                <section id="decan">
                    <Decan {...{ user }} />
                </section>
                <section id="account" className="main-and-footer">
                    <Settings {...{ user }} />
                </section>
            </div>
        </>
    );
}
