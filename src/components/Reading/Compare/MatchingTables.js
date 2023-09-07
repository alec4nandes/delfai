export default function MatchingTables({ matching }) {
    return (
        <div id="matching" className="compare">
            <h3>Matching</h3>
            {Object.entries(matching).map(([words, cards], i) => (
                <table key={`${words}-${i}`}>
                    <tbody>
                        <tr>
                            <td className="words-cell">{words}</td>
                            <td className="cards-cell">{cards.join(", ")}</td>
                        </tr>
                    </tbody>
                </table>
            ))}
        </div>
    );
}
