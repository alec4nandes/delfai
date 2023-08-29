import getRandomCards from "../deck.js";

export default function Home({ setCards, setQuestion }) {
    const questions = {
        "Self-Discovery":
            "What aspects of myself should I focus on to better understand who I am?",
        Embracing:
            "How can I welcome and adapt to life's changes with a positive mindset?",
        Overcoming:
            "What strengths can I harness to navigate challenges and emerge stronger?",
        Inner: "What steps can I take to facilitate emotional healing and well-being?",
        Cultivating:
            "What steps can I take to develop a more compassionate and understanding nature?",
        Empowering:
            "What qualities should I nurture to pursue my goals with determination?",
        Balancing:
            "What areas of my life need more balance to enhance my overall harmony?",
        Building:
            "How can I improve my connections with others and create deeper bonds?",
        Fostering:
            "What can I do to stimulate and express my creative potential more fully?",
        Mindful:
            "What practices can help me stay present and make the most of each moment?",
        Strengthening:
            "How can I boost my self-confidence and believe in my abilities?",
        Finding:
            "What strategies will aid me in finding tranquility amidst life's hustle and bustle?",
        Emotional:
            "How can I delve into my emotions to gain deeper insights into my feelings?",
        Nurturing:
            "What actions can I take to cultivate a stronger sense of self-love and acceptance?",
        Letting:
            "What aspects of my life should I consider releasing in order to move forward?",
        Practicing:
            "How can I develop a habit of appreciating the positive aspects of my life?",
        Enhancing:
            "What methods can I use to connect more strongly with my inner intuition?",
        Focusing:
            "What can I do to shift my perspective towards a more positive outlook?",
        Living: "How can I align my actions and choices with my true, authentic self?",
    };

    return (
        <div id="home" className="slide">
            <div className="slide-container">
                <h1>Delfai</h1>
                <h2>Ask the Tarot cards a question:</h2>
                <p>
                    <em>Please keep in mind while writing your question:</em>
                    <br />
                    These cards serve as a wellspring for personal
                    introspection, rather than a means to definitively ascertain
                    outcomes.
                </p>
                <form
                    id="custom"
                    onSubmit={(e) => handleForm(e, setCards, setQuestion)}
                >
                    <textarea name="question"></textarea>
                    <button type="submit">ask</button>
                </form>
                <div id="questions">
                    <h2>Or choose one of these questions:</h2>
                    {Object.entries(questions).map(([key, value], i) => (
                        <form
                            onSubmit={(e) =>
                                handleForm(e, setCards, setQuestion)
                            }
                            key={`question-${i + 1}`}
                        >
                            <button name="question" type="submit" value={value}>
                                <h3>{key}</h3>
                                {value}
                            </button>
                        </form>
                    ))}
                </div>
            </div>
        </div>
    );
}

function handleForm(e, setCards, setQuestion) {
    e.preventDefault();
    setCards(getRandomCards());
    setQuestion(e.target.question.value);
}
