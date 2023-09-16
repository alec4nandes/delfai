import { Fragment } from "react";

export default function OppositesTables({ opposites }) {
    return (
        <div id="opposites" className="compare">
            <h3>Opposites</h3>
            <table>
                <tbody>
                    {Object.entries(opposites).map(([words, info], i) => (
                        <Fragment key={`opposites-${words}-${i}`}>
                            {i ? (
                                <tr>
                                    <td className="spacer-row" colSpan={2}></td>
                                </tr>
                            ) : (
                                <></>
                            )}
                            <tr>
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
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
