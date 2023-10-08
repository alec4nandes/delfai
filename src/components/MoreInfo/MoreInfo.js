import { kabbalah } from "../../kabbalah.js";
import Rank from "./Rank.js";
import Suit from "./Suit.js";

export default function MoreInfo({ card, isKabbalah }) {
    const major = isKabbalah && kabbalah[card.name.replace(" reversed", "")];
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
        <p>
            This Major Arcana card represents{" "}
            <strong>
                {major.astro || major.element || (
                    <>
                        the zodiac sign {major.zodiac.sign} (
                        {major.zodiac.start_date} - {major.zodiac.end_date})
                    </>
                )}
            </strong>{" "}
            and the hebrew letter:
            <span className="hebrew-letter">
                {major.letter}
                <span>{major.translate}</span>
            </span>
        </p>
    );
}
