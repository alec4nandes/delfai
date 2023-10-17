import { handleJump } from "../../../../../display.js";

export default function NavBar() {
    return (
        <header>
            <nav>
                <ul>
                    {["Spread", "Past", "Present", "Future", "Advice"].map(
                        (title, i) => (
                            <li
                                id={`nav-${title.toLowerCase()}`}
                                className={i ? "" : "highlighted"}
                                onClick={(e) => handleJump(title.toLowerCase())}
                                key={`nav-${title}`}
                            >
                                {title}
                            </li>
                        )
                    )}
                    <li onClick={(e) => window.location.reload()}>
                        New Spread
                    </li>
                </ul>
            </nav>
        </header>
    );
}
