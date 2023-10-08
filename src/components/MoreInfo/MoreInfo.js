import { kabbalahMajors } from "../../kabbalah.js";
import Rank from "./Rank.js";
import Suit from "./Suit.js";

export default function MoreInfo({ card, isKabbalah }) {
    const major =
        isKabbalah && kabbalahMajors[card.name.replace(" reversed", "")];
    return major ? (
        <MajorKabbalah {...{ major }} />
    ) : (
        <>
            <Rank {...{ card, isKabbalah }} />
            <Suit {...{ card, isKabbalah }} />
        </>
    );
}

function MajorKabbalah({ major }) {
    return (
        <>
            <p>
                <span className="symbolize">{major.symbol}</span>
                This Major Arcana card represents{" "}
                <strong>
                    {major.astro || major.element || (
                        <>
                            the zodiac sign {major.zodiac.sign} (
                            {major.zodiac.start_date} - {major.zodiac.end_date})
                        </>
                    )}
                </strong>{" "}
                and the Hebrew letter:
                <br />
                <br />
                <span className="symbolize">
                    {major.kabbalah.letter.hebrew}
                    <span>
                        {major.kabbalah.letter.name}
                        <br />
                        <small>
                            (gematria: {major.kabbalah.letter.gematria})
                        </small>
                    </span>
                </span>
            </p>
            <p>
                This letter's path runs from{" "}
                <KabbalahLink name={major.kabbalah.tree.from} /> to{" "}
                <KabbalahLink name={major.kabbalah.tree.to} /> on the Tree of
                Life.
            </p>
        </>
    );
}

function KabbalahLink({ name }) {
    return (
        <a href={getKabUrl(name)} target="_blank" rel="noopener">
            {name}
        </a>
    );

    function getKabUrl(str) {
        return `/kabbalah/#${str.toLowerCase()}`;
    }
}

export { KabbalahLink };
