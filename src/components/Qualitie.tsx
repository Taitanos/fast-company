import React from "react";



type PropsType = {
    qualName: string
    qualColor: string
}

function Qualitie (props: PropsType) {
    return (
            <span className={"badge m-1 bg-" + props.qualColor}>
                {props.qualName}
            </span>
    )
}

export default Qualitie;