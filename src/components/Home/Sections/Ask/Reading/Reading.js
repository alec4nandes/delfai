import { handleScroll } from "../../../Home";
import Advice from "./Advice";
import NavBar from "../../../Navbar";
import Spread from "./Spread";
import TimeSlide from "./TimeSlide";

export default function Reading({ cards, setCards, isKabbalah, user }) {
    const Slide = ({ timeframe }) => (
        <TimeSlide
            {...{
                cards,
                card: cards.spread[timeframe.toLowerCase()],
                timeframe,
                isKabbalah,
            }}
        />
    );
    return (
        <>
            <NavBar {...{ setCards, user }} />
            <div
                id="reading"
                onScroll={(e) =>
                    handleScroll(e, [
                        "spread",
                        "past",
                        "present",
                        "future",
                        "advice",
                    ])
                }
            >
                <Spread {...{ cards, isKabbalah }} />
                <Slide timeframe="Past" />
                <Slide timeframe="Present" />
                <Slide timeframe="Future" />
                <Advice {...{ cards, isKabbalah }} />
            </div>
        </>
    );
}
