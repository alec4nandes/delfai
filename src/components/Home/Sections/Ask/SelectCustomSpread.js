import { allCards } from "../../../../compare/data.js";

export default function SelectCustomSpread({
    isCustom,
    custom,
    setCustom,
    size,
    setSize,
}) {
    return (
        isCustom && (
            <div id="custom-spread">
                <label>
                    spread size:{" "}
                    <select
                        name="custom"
                        defaultValue={size}
                        onChange={(e) => setSize(+e.target.value)}
                    >
                        {new Array(10).fill(0).map((_, i) => (
                            <option value={i + 1} key={`spread-size-${i + 1}`}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </label>
                {new Array(size).fill(0).map((_, i) => (
                    <SelectCard {...{ i, key: `select-${i + 1}` }} />
                ))}
            </div>
        )
    );

    function SelectCard({ i }) {
        return (
            <div className="custom-card-select">
                <select
                    id={`card-${i + 1}`}
                    defaultValue={custom[i]?.replace(" reversed", "") || ""}
                    onChange={(e) => setCustomHelper(e, i)}
                >
                    <option value="">---</option>
                    {Object.keys(allCards).map((cardName) => (
                        <option value={cardName} key={`${cardName}-${i + 1}`}>
                            {cardName}
                        </option>
                    ))}
                </select>
                <label>
                    <input
                        id={`reversed-${i + 1}`}
                        type="checkbox"
                        defaultChecked={custom[i]?.includes(" reversed")}
                        onChange={(e) => setCustomHelper(e, i, true)}
                    />{" "}
                    reversed
                </label>
            </div>
        );

        function setCustomHelper(e, i, isCheckbox) {
            const selectValue = document.querySelector(`#card-${i + 1}`).value;
            if (isCheckbox && !selectValue) {
                alert("Please select a card.");
                e.target.checked = false;
                return;
            }
            const rev = document.querySelector(`#reversed-${i + 1}`).checked
                    ? " reversed"
                    : "",
                card = selectValue ? selectValue + rev : "",
                newCustom = [...custom];
            i < newCustom.length
                ? newCustom.splice(i, 1, card)
                : (newCustom[i] = card);
            const sizeOfSet = [
                    ...new Set(
                        newCustom.map(
                            (card) => card?.replace(" reversed", "") || ""
                        )
                    ),
                ].filter(Boolean).length,
                isInvalid =
                    !isCheckbox &&
                    sizeOfSet !== newCustom.filter(Boolean).length;
            if (isInvalid) {
                alert("Invalid selection! No duplicate cards.");
                e.target.value = custom[i]?.replace(" reversed", "") || "";
                return;
            }
            console.log(newCustom);
            setCustom(newCustom);
        }
    }
}
