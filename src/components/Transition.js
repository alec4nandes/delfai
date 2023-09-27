import "../css/loading.css";

export default function Transition({ isTransition }) {
    return (
        <div
            id="loading"
            style={{
                opacity: isTransition ? 1 : 0,
                zIndex: isTransition ? 2 : -1,
            }}
        ></div>
    );
}