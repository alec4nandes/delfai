import MatchingTables from "./MatchingTables";
import OppositesTables from "./OppositeTables";

export default function Compare({ matching, opposites }) {
    return (
        <>
            {hasEntries(matching) && <MatchingTables {...{ matching }} />}
            {hasEntries(opposites) && <OppositesTables {...{ opposites }} />}
        </>
    );

    function hasEntries(obj) {
        return obj && !!Object.entries(obj).length;
    }
}
