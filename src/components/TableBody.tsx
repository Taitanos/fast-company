import React from "react";
import {UsersType} from "../api/fake.api/user.api";
import {ColumnsType} from "./UserTable";
import _ from "lodash";

type PropsType = {
    data: UsersType[]
    columns: ColumnsType
}

function TableBody({data, columns}: PropsType) {

    const renderContent = (item: UsersType, column: string) => {
        if (columns[column].component) {
            const component = columns[column].component
            if (typeof component === "function") {
                return component(item)
            }
            return component
        }
        return _.get(item, columns[column].path)
    }

    return (
        <tbody>
        {data.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>
                            {renderContent(item, column)}
                        </td>
                    ))}
                </tr>
            )
        )}
        </tbody>
    )
}

export default TableBody;