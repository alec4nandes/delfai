import { handleJump } from "../../../../../display.js";

export default function NextButton() {
    return (
        <button
            className="next-button standard-btn"
            onClick={(e) => handleJump()}
        >
            NEXT
        </button>
    );
}
