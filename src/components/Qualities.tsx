import React from "react";

type PropsType = {
    qualities: {
        _id: string
        name: string
        color: string
    }[]
}

function Qualities (props: PropsType) {
    return (
        <>
            {props.qualities.map(item => <span className={"badge m-1 bg-" + item.color}
                                                    key={item._id}>{item.name}</span>)}
        </>
    )
}

export default Qualities;