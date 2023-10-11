import React from "react";

type PropsType = {
    items: any
    onItemSelect: () => void
    valueProperty: string
    contentProperty: string
}

function GroupList({items, onItemSelect, valueProperty, contentProperty}: PropsType) {
    console.log(Object.keys(items))
    return (
        <ul className={"list-group"}>
            {Object.keys(items).map((item) => (
                <li
                    key={items[item][valueProperty]}
                    className={"list-group-item"}>
                    {items[item][contentProperty]}
                </li>
            ))}
        </ul>
    )
}

export default GroupList;