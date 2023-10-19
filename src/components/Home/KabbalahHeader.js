import { IS_DEVELOPMENT } from "../../database";

export default function KabbalahHeader({ isKabbalah }) {
    return (
        isKabbalah && (
            <h3>
                <a
                    href={`${IS_DEVELOPMENT ? "http://localhost:5000" : ""}/kabbalah`}
                    target="_blank"
                    rel="noopener"
                >
                    Kabbalah
                </a>{" "}
                Focused
            </h3>
        )
    );
}
