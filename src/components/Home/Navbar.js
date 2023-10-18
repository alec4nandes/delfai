import { handleJump } from "../../display.js";

export default function NavBar({ isHome, setCards }) {
    return (
        <nav>
            <ul>
                {(isHome
                    ? ["Dashboard", "Ask", "Decan", "Account"]
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
                {setCards && <li onClick={() => setCards(null)}>New Spread</li>}
            </ul>
        </nav>
    );
}
