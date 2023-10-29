import React from "react";

type PropsType = {
    qualName: string
    qualColor: string
}

function Qualitie ({qualName, qualColor}: PropsType) {
    return (
            <span className={"badge m-1 bg-" + qualColor}>
                {qualName}
            </span>
    )
}

export default Qualitie;