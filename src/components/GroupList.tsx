import React from "react";

type PropsType = {
    items: any
    onItemSelect: () => void
    valueProperty: string
    contentProperty: string
}

function GroupList(props: PropsType) {
    console.log(Object.keys(props.items))
    return (
        <ul className={"list-group"}>
            {Object.keys(props.items).map((item) => (
                <li
                    key={props.items[item][valueProperty]}
                    className={"list-group-item"}>
                    {props.items[item][contentProperty]}
                </li>
            ))}
        </ul>
    )
}

export default GroupList;