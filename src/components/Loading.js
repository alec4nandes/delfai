import { useEffect, useState } from "react";
import "../css/loading.css";

export default function Loading({ loaded, isTransition }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        loaded && setTimeout(() => setShow(isTransition), 150);
    }, [loaded, isTransition, setShow]);

    return (
        <div
            id="loading-container"
            style={{ visibility: show, zIndex: show ? 2 : -1 }}
        >
            <div
                id="loading"
                style={{
                    opacity: isTransition ? 1 : 0,
                }}
            ></div>
        </div>
    );
}
