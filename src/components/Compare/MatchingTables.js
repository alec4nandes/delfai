export default function MatchingTables({ matching }) {
    return (
        <div id="matching" className="compare">
            <h3>Matching</h3>
            <table>
                <tbody>
                    {Object.entries(matching).map(([words, cards], i) => (
                        <tr key={`${words}-${i}`}>
                            <td className="words-cell">{words}</td>
                            <td className="cards-cell">{cards.join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
