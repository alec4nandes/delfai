import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../database.js";
import { compareCards } from "../../compare/compare.js";
import { getSpread } from "../../compare/spread.js";

export default function Questions({
    setCards,
    setUser,
    user,
    setIsTransition,
}) {
    const questions = {
        Love: [
            "What do the Tarot cards reveal about the current state of my romantic relationship?",
            "Can you provide insight into what I need to work on to improve my love life?",
            "Are there any potential romantic opportunities or challenges on the horizon?",
            "What lessons can I learn from past relationships to enhance my future ones?",
            "How can I bring more love and harmony into my life right now?",
        ],
        Career: [
            "What does the Tarot suggest about my current career path and job satisfaction?",
            "Can you offer guidance on potential career changes or opportunities I should consider?",
            "What strengths or skills should I focus on to advance in my career?",
            "Are there any obstacles or challenges I should be aware of in my professional life?",
            "How can I achieve a better work-life balance and overall career success?",
        ],
        Health: [
            "What insights can the Tarot provide regarding my current health and well-being?",
            "Are there any specific lifestyle changes or habits I should prioritize for better health?",
            "Can you offer guidance on managing any existing health issues or concerns?",
            "What should I know about my mental and emotional health at this time?",
            "How can I maintain a healthier, more balanced lifestyle going forward?",
        ],
        "Social Life": [
            "What do the Tarot cards reveal about my current social connections and friendships?",
            "Can you offer insights into how I can improve my social interactions and relationships?",
            "Are there any upcoming social events or gatherings I should be aware of?",
            "What should I know about the dynamics within my social circle?",
            "How can I expand my social horizons and make new connections in my life?",
        ],
    };

    const buttons = Object.entries(questions).map(([section, lines], i) => (
        <div className="question-section" key={`${section}-questions`}>
            <h2>{section}</h2>
            {lines.map((question) => (
                <button
                    name="question"
                    onClick={(e) =>
                        handleQuestion(
                            e.target.value,
                            setCards,
                            setUser,
                            user,
                            setIsTransition,
                            false // TODO: enable Kabbalah for these questions
                        )
                    }
                    type="submit"
                    value={question}
                    key={question}
                >
                    {question}
                </button>
            ))}
        </div>
    ));

    return (
        <div id="questions">
            <h2>Or choose one of these questions about...</h2>
            {buttons}
        </div>
    );
}

function handleQuestion(
    question,
    setCards,
    setUser,
    user,
    setIsTransition,
    isKabbalah
) {
    const compare = compareCards(getSpread(), question, false, isKabbalah);
    setCards(compare);
    setIsTransition(true);
    console.log(compare);
    if (!user.paid) {
        setUser((user) => ({ ...user, free_draws: user.free_draws - 1 }));
        updateDoc(doc(db, "users", user.email), {
            free_draws: user.free_draws - 1,
        });
    }
}

export { handleQuestion };
