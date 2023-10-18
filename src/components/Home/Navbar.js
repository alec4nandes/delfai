import { handleJump } from "../../display.js";

export default function NavBar({ isHome, setCards, user }) {
    return (
        <nav id={isHome ? "home-menu" : "reading-menu"}>
            <ul>
                {(isHome
                    ? [
                          "Dashboard",
                          (user.paid || user.free_draws > 0) && "Ask",
                          "Decan",
                          "Account",
                      ].filter(Boolean)
                    : ["Spread", "Past", "Present", "Future", "Advice"]
                ).map((title, i) => (
                    <li
                        id={`nav-${title.toLowerCase()}`}
                        className={i ? "" : "highlighted"}
                        onClick={(e) => handleJump(title.toLowerCase(), isHome)}
                        key={`nav-${title}`}
                    >
                        {title}
                    </li>
                ))}
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
