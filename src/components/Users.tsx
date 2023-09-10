import React from "react";
import User from "./User";

type UsersType = {
    _id: string
    name: string
    profession: {
        _id: string
        name: string
    }
    qualities: {
        _id: string
        name: string
        color: string
    }[]
    completedMeetings: number
    rate: number
    bookmark: boolean
} []

type PropsType = {
    handleDelete: (usersId: string) => void
    renderPhase: (number: number) => "человек тусанет" | "человека тусанет"
    users: UsersType
}

function Users(props:PropsType) {

    return (
        <>
            <h2>
                <span className={"badge bg-" + (props.users.length > 0 ? "primary" : "danger")}>
                    {props.users.length > 0 ? `${props.users.length} ${props.renderPhase(props.users.length)} с тобой сегодня` : "Никто с тобой не тусанет"}
                </span>
            </h2>
            {props.users.length > 0 && (
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качество</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {props.users.map((user) => (
                        <User user={user} handleDelete={props.handleDelete}/>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default Users;