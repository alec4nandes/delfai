import "../../css/home.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSpread } from "../../compare/spread.js";
import { allCards } from "../../compare/data.js";
import { getToday } from "../../decan.js";
import fillRef from "../../display.js";
import CustomReading from "../CustomReading";
import Dashboard from "./Dashboard";
import Decan from "../Decan";
import Loading from "./Loading";
import Reading from "../Reading/Reading";
import Settings from "../Settings";

export default function Home({ user, setUser }) {
    const [cards, setCards] = useState(),
        [isSettings, setIsSettings] = useState(false),
        [isCustom, setIsCustom] = useState(false),
        [custom, setCustom] = useState(getSpread().map(({ name }) => name)),
        [isTransition, setIsTransition] = useState(false),
        [isKabbalah, setIsKabbalah] = useState(false),
        [isDecan, setIsDecan] = useState(false),
        [decanCards, setDecanCards] = useState(getToday()),
        pastRef = useRef(),
        presentRef = useRef(),
        futureRef = useRef(),
        adviceRef = useRef(),
        customRef = useRef(),
        decanRef = useRef(),
        pastWaitRef = useRef(),
        presentWaitRef = useRef(),
        futureWaitRef = useRef(),
        adviceWaitRef = useRef(),
        customWaitRef = useRef(),
        decanWaitRef = useRef();

    const getReading = useCallback(() => {
        if (!cards && !decanCards) {
            return;
        }
        // wait for components to load
        setTimeout(() => {
            if (isCustom) {
                fillRef(
                    cards,
                    "custom spread",
                    customWaitRef,
                    customRef,
                    true,
                    isKabbalah
                );
            } else if (isDecan) {
                fillRef(
                    decanCards,
                    null,
                    decanWaitRef,
                    decanRef,
                    true,
                    false // TODO: enable Kabbalah for Decan
                );
            } else {
                const elemRefs = {
                        past: pastRef,
                        present: presentRef,
                        future: futureRef,
                        advice: adviceRef,
                    },
                    waitRefs = {
                        past: pastWaitRef,
                        present: presentWaitRef,
                        future: futureWaitRef,
                        advice: adviceWaitRef,
                    };
                Object.keys(elemRefs).forEach((timeframe) =>
                    fillRef(
                        cards,
                        timeframe,
                        waitRefs[timeframe],
                        elemRefs[timeframe],
                        false,
                        isKabbalah
                    )
                );
            }
        }, 500);
    }, [cards, decanCards, isCustom, isDecan, isKabbalah]);

    useEffect(() => {
        isTransition &&
            setTimeout(() => {
                setIsTransition(false);
                getReading();
            }, 1950);
    }, [getReading, isTransition]);

    useEffect(() => {
        preloadCardImages();

        function preloadCardImages() {
            Object.keys(allCards).forEach((cardName) => {
                const img = new Image();
                img.src = `/assets/cards/${cardName}.jpg`;
            });
        }
    }, []);

    return (
        <>
            <Loading {...{ isTransition }} />
            {isTransition ? (
                <></>
            ) : isSettings ? (
                <Settings {...{ user }} />
            ) : isCustom ? (
                <CustomReading
                    {...{
                        cards,
                        customWaitRef,
                        customRef,
                        custom,
                        setCustom,
                        setCards,
                        setIsCustom,
                        user,
                        setIsTransition,
                        setIsKabbalah,
                        isKabbalah,
                    }}
                />
            ) : isDecan ? (
                <Decan
                    {...{
                        user,
                        decanCards,
                        setDecanCards,
                        decanRef,
                        decanWaitRef,
                        setIsTransition,
                    }}
                />
            ) : cards ? (
                <Reading
                    {...{
                        cards,
                        isKabbalah,
                        pastRef,
                        pastWaitRef,
                        presentRef,
                        presentWaitRef,
                        futureRef,
                        futureWaitRef,
                        adviceRef,
                        adviceWaitRef,
                    }}
                />
            ) : (
                <Dashboard
                    {...{
                        user,
                        setUser,
                        custom,
                        setIsSettings,
                        setIsCustom,
                        setCustom,
                        setCards,
                        cards,
                        setIsTransition,
                        setIsKabbalah,
                        isKabbalah,
                        setIsDecan,
                    }}
                />
            )}
        </>
    );
}
