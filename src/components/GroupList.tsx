import React from "react";
import {ProfessionsTypeObject, ProfessionType} from "../api/fake.api/user.api";

type PropsType = {
    items: /*ProfessionsTypeObject | ProfessionType[]*/ any
    onItemSelect: (item: ProfessionType) => void
    selectedItem: undefined | ProfessionType
    valueProperty?: string
    contentProperty?: string
}

function GroupList({items, onItemSelect, selectedItem, valueProperty = "_id", contentProperty = "name"}: PropsType) {




    return (
        <ul className={"list-group"}>
            {Object.keys(items).map((item) => (
                <li
                    key={items[item][valueProperty]}
                    className={"list-group-item" + (items[item] === selectedItem ? " active" : "")}
                    onClick={() => onItemSelect(items[item])}
                    role={"button"}
                >
                    {items[item][contentProperty]}
                </li>
            ))}
        </ul>
    )
}

export default GroupList;