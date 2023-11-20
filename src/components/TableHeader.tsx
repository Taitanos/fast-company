import React from "react";
import {SortByType} from "./UsersList";
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

    const renderSortArrow = (selectedSort: SortByType, currentPath: string) => {
        return selectedSort.path === currentPath ? selectedSort.order === "asc" ?
            <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-up-fill"></i> : "";
    }

    return (
        <thead>
        <tr>
            {Object.keys(columns).map((column) => (
                <th key={column}
                    onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined} {...{role: columns[column].path && "button"}}
                    scope={"col"}>
                    {columns[column].name} {renderSortArrow(selectedSort, columns[column].path)}
                </th>
            ))}
        </tr>
        </thead>
    )
}

export default TableHeader;