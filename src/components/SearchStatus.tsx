import React from "react";

type PropsType = {
    length: number
    renderPhase: (number: number) => "человек тусанет" | "человека тусанет"
}

function SearchStatus (props: PropsType) {
    return (
        <>
            <h2>
                <span className={"badge bg-" + (props.length > 0 ? "primary" : "danger")}>
                    {props.length > 0 ? `${props.length} ${props.renderPhase(props.length)} с тобой сегодня` : "Никто с тобой не тусанет"}
                </span>
            </h2>
        </>
    )
}

export default SearchStatus;