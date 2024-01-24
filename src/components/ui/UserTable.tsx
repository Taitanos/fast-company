import React from "react";
import {UsersType} from "../../api/fake.api/user.api";
import {SortByType} from "../page/usersListPage/UsersListPage";
import Bookmark from "../common/Bookmark";
import Qualities from './qualities';
import Table from '../common/table';
import {Link} from "react-router-dom";

type PropsType = {
    onDelete: (usersId: string) => void
    onChangeBookmark: (usersId: string) => void
    onSort: (item: SortByType) => void
    selectedSort: SortByType
    users: UsersType[]
}

type ColumnType = {
    [key: string]: string
}
type UserType = {
    path: string
    name: string
    component: (user: UsersType) => void
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
    [key: string]: ColumnType | BookmarkType | DeleteType | QualitiesType | UserType
    name: UserType
    qualities: QualitiesType
    professions: ColumnType
    completedMeetings: ColumnType
    rate: ColumnType
    bookmark: BookmarkType
    delete: DeleteType
}

function UserTable({users, onDelete, onChangeBookmark, onSort, selectedSort}: PropsType) {

    const columns = {
        name: {
            path: 'name',
            name: 'Имя',
            component: (user: UsersType) => <Link to={`${user._id}`}>{user.name}</Link>
        },
        qualities: {name: 'Качества', component: (user: UsersType) => (<Qualities qualities={user.qualities}/>)},
        professions: {path: 'profession.name', name: 'Профессия'},
        completedMeetings: {path: 'completedMeetings',name: 'Встретился, раз'},
        rate: {path: 'rate', name: 'Оценка'},
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: (user: UsersType) => (
                <Bookmark
                    status={user.bookmark}
                    handleBookmark={() => onChangeBookmark(user._id)}
                />
            )
        },
        delete: {
            component: (user: UsersType) => (
                <button className={"btn btn-danger"} onClick={() => onDelete(user._id)}>Удалить
                </button>
            )
        },
    }

    return (
        <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users}/>
    )
}

export default UserTable;