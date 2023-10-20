import { IS_DEVELOPMENT } from "../database";
import Footer from "./Footer";
import Subscribe from "./Home/Subscribe/Subscribe";

export default function SubscribeForm({ user }) {
    return (
        <div id="home">
            <section className="main-and-footer">
                <div className="container">
                    <main>
                        <div className="vertical-center">
                            <div>
                                <h1>
                                    <span style={{ fontSize: "0.7em" }}>
                                        Subcribe to
                                    </span>
                                    <br />
                                    Delfai Oracle
                                </h1>
                                <h2 style={{ marginTop: "8px" }}>
                                    Tarot Card Readings
                                </h2>
                            </div>
                            <div className="description">
                                Delfai Oracle costs only $2.99 a month to unlock
                                all features!{" "}
                                <a
                                    href={
                                        IS_DEVELOPMENT
                                            ? "http://localhost:5000"
                                            : "/"
                                    }
                                >
                                    Learn more.
                                </a>
                            </div>
                            <Subscribe {...{ user }} />
                            <button
                                className="standard-btn"
                                onClick={() => (window.location.href = "/home")}
                            >
                                go to app
                            </button>{" "}
                        </div>
                    </main>
                    <Footer />
                </div>
            </section>
        </div>
    );
}
