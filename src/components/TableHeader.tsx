import React from "react";
import {SortByType} from "./Users";
import {ColumnsType} from "./UserTable";

type PropsType = {
    onSort: (item: SortByType) => void
    selectedSort: SortByType
    columns: ColumnsType
}

function TableHeader({onSort, selectedSort, columns}: PropsType) {

    const handleSort = (item: string) => {
        if (selectedSort.path === item) {
            onSort({...selectedSort, order: selectedSort.order === 'asc' ? 'desc' : 'asc'})
        } else {
            onSort({path: item, order: 'asc'})
        }
    }

    return (
        <thead>
        <tr>
            {Object.keys(columns).map((column) => (
                <th key={column}
                    onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined} {...{role: columns[column].path && "button"}}
                    scope={"col"}>
                    {columns[column].name}
                </th>
            ))}
        </tr>
        </thead>
    )
}

export default TableHeader;