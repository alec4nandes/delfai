import { handleJump } from "../display.js";

export default function NextButton() {
    return (
        <button className="next-button" onClick={(e) => handleJump()}>
            NEXT
        </button>
    );
}
