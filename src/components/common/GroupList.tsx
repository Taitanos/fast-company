import React from "react";
import {ProfessionsTypeObject, ProfessionType} from "../../api/fake.api/user.api";

type PropsType = {
    items: ProfessionsTypeObject | ProfessionType[]
    onItemSelect: (item: ProfessionType) => void
    selectedItem: undefined | ProfessionType
    valueProperty?: string
    contentProperty?: string
}

function GroupList({items, onItemSelect, selectedItem, valueProperty = "_id", contentProperty = "name"}: PropsType) {

    if (!Array.isArray(items)) {
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
    return (
        <ul className={"list-group"}>
            {items.map((item) => {
                return (
                    <li
                        key={item[valueProperty]}
                        className={"list-group-item" + (item === selectedItem ? " active" : "")}
                        onClick={() => onItemSelect(item)}
                        role={"button"}
                    >
                        {item[contentProperty]}
                    </li>
                )
            })}
        </ul>
    )
}

export default GroupList;