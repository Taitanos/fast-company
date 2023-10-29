import React from "react";
import {UserType} from "../api/fake.api/user.api";
import {SortByType} from "./Users";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Bookmark from "./Bookmark";

type PropsType = {
    onDelete: (usersId: string) => void
    onChangeBookmark: (usersId: string) => void
    onSort: (item: SortByType) => void
    selectedSort: SortByType
    users: UserType[]
}

type ColumnType = {
    [key: string]: string
}
type BookmarkType = {
    path: string
    name: string
}
type DeleteType = any

type QualitiesType = {
    name: string
}

export type ColumnsType = {
    [key: string]: ColumnType | BookmarkType | DeleteType | QualitiesType
    name: ColumnType
    qualities: QualitiesType
    professions: ColumnType
    completedMeetings: ColumnType
    rate: ColumnType
    bookmark: BookmarkType
    delete: DeleteType
}

function UserTable({users, onDelete, onChangeBookmark, onSort, selectedSort}: PropsType) {

    const columns = {
        name: {path: 'name', name: 'Имя'},
        qualities: {name: 'Качество'},
        professions: {path: 'profession.name', name: 'Профессия'},
        completedMeetings: {
            path: 'completedMeetings', 
            name: 'Встретился, раз'
        },
        rate: {path: 'rate', name: 'Оценка'},
        bookmark: {
            path: 'bookmark', 
            name: 'Избранное', 
            component: (user: UserType) => (
                <Bookmark
                    status={user.bookmark}
                    handleBookmark={()=> onChangeBookmark (user._id)}
                />
            )
        },
        delete: {component: (user: UserType) => (
                <button className={"btn btn-danger"} onClick={() => onDelete(user._id)}>Удалить
                </button>
            )},
    }

    return (
        <table className={"table"}>
            <TableHeader {...{onSort, selectedSort, columns}}/>
            <TableBody {...{data: users, columns}}/>
        </table>
    )
}

export default UserTable;