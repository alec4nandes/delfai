import { handleJump } from "../../display.js";

export default function NavBar({ isHome, setCards, user }) {
    return (
        <nav id={isHome ? "home-menu" : "reading-menu"}>
            <ul>
                {(isHome
                    ? [
                          "Dashboard",
                          (user.paid || user.free_draws > 0) && "Ask",
                          "Daily Cards",
                          "Account",
                      ].filter(Boolean)
                    : ["Spread", "Past", "Present", "Future", "Advice"]
                ).map((title, i) => {
                    const id = title === "Daily Cards" ? "Decan" : title;
                    return (
                        <li
                            id={`nav-${id.toLowerCase()}`}
                            className={i ? "" : "highlighted"}
                            onClick={() => handleJump(id.toLowerCase(), isHome)}
                            key={`nav-${id}`}
                        >
                            {title}
                        </li>
                    );
                })}
                {setCards && (
                    <li
                        onClick={() =>
                            user.paid || user.free_draws > 0
                                ? setCards(null)
                                : handleJump("dashboard", true)
                        }
                    >
                        New Spread
                    </li>
                )}
            </ul>
        </nav>
    );
}
