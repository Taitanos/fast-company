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
    handleBookmark: (usersId: string) => void
    users: UsersType
}

function Users(props:PropsType) {

    return (
        <>

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
                        <User user={user} handleDelete={props.handleDelete} handleBookmark={props.handleBookmark}/>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default Users;