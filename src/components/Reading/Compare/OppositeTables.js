export default function OppositesTables({ opposites }) {
    return (
        <div id="opposites" className="compare">
            <h3>Opposites</h3>
            {Object.entries(opposites).map(([words, info], i) => (
                <table key={`opposites-${words}-${i}`}>
                    <tbody>
                        <tr className="new-opposite">
                            <td>{words}</td>
                            <td>{info.cards.join(", ")}</td>
                        </tr>
                        <tr>
                            <td className="unlike-row" colSpan={2}>
                                unlike
                            </td>
                        </tr>
                        {Object.entries(info)
                            .filter(([key]) => key !== "cards")
                            .map(([oppoWords, oppoCards]) => (
                                <tr key={`${words}-${oppoWords}`}>
                                    <td>{oppoWords}</td>
                                    <td>{oppoCards.join(", ")}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            ))}
        </div>
    );
}
