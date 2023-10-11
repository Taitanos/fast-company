import React from "react";

type PropsType = {
    length: number
    renderPhase: (number: number) => "человек тусанет" | "человека тусанет"
}

function SearchStatus ({length, renderPhase}: PropsType) {
    return (
        <>
            <h2>
                <span className={"badge bg-" + (length > 0 ? "primary" : "danger")}>
                    {length > 0 ? `${length} ${renderPhase(length)} с тобой сегодня` : "Никто с тобой не тусанет"}
                </span>
            </h2>
        </>
    )
}

export default SearchStatus;