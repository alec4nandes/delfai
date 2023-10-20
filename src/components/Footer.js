import { IS_DEVELOPMENT } from "../database.js";
import Social from "./Social";

const root = IS_DEVELOPMENT ? "http://localhost:5000/" : "/",
    getSectionURL = (id) => `${root}#${id}`;

export default function Footer() {
    return (
        <footer>
            <div id="footer-container">
                <ul>
                    <li>
                        <a href="/home/?page=subscribe">Subscribe</a>
                        &nbsp; | &nbsp;
                        <a href={getSectionURL("refunds")}>Refund Policy</a>
                    </li>
                    <li>
                        <a href={getSectionURL("privacy")}>Privacy Policy</a>
                    </li>
                    <li>
                        <a href={getSectionURL("disclaimer")}>Disclaimer</a>
                    </li>
                    <li>
                        <a href={getSectionURL("contact")}>Contact</a>
                    </li>
                    <li>
                        <a href={root}>Home</a> &nbsp;|&nbsp;{" "}
                        <a href={`${root}kabbalah`}>Kabbalah</a> &nbsp;|&nbsp;{" "}
                        <a
                            href="https://fern.haus"
                            target="_blank"
                            rel="noopener"
                        >
                            &copy; Fern Haus
                        </a>
                    </li>
                </ul>
                <Social />
            </div>
        </footer>
    );
}
