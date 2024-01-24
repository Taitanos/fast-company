import React, {ReactNode} from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import {SortByType} from "../../page/usersListPage/UsersListPage";
import {ColumnsType} from "../../ui/UserTable";
import {UsersType} from "../../../api/fake.api/user.api";

type PropsType = {
    onSort: (item: SortByType) => void
    selectedSort: SortByType
    columns: ColumnsType
    data: UsersType[]
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
