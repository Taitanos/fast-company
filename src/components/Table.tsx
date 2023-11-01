import React, {ReactNode} from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import {SortByType} from "./Users";
import {ColumnsType} from "./UserTable";
import {UserType} from "../api/fake.api/user.api";

type PropsType = {
    onSort: (item: SortByType) => void
    selectedSort: SortByType
    columns: ColumnsType
    data: UserType[]
    children?: ReactNode[]
}

function Table({onSort, selectedSort, columns, data, children}: PropsType) {
    return (
        <table className={"table"}>
            {children || (
                <>
                    <TableHeader {...{onSort, selectedSort, columns}}/>
                    <TableBody {...{data, columns}}/>
                </>
            )}
        </table>
    )
}

export default Table;
