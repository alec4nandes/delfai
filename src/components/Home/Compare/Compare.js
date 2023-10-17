import MatchingTables from "./MatchingTables";
import OppositesTables from "./OppositeTables";

export default function Compare({ matching, opposites }) {
    return (
        hasEntries({ ...matching, ...opposites }) && (
            <>
                
                <div id="compare-tables">
                    {hasEntries(matching) && (
                        <MatchingTables {...{ matching }} />
                    )}
                    {hasEntries(opposites) && (
                        <OppositesTables {...{ opposites }} />
                    )}
                </div>
                
            </>
        )
    );

    function hasEntries(obj) {
        return obj && !!Object.entries(obj).length;
    }
}
