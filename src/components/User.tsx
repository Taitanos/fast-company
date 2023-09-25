import React from "react";
import Qualities from "./Qualities";

export type UserType = {
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
}

type PropsType = {
    user: UserType
    handleDelete: (usersId: string) => void
    handleBookmark: (boolean: boolean) => void
}

function User (props:PropsType) {
    return (
        <>
            <tr key={props.user._id}>
                <td>{props.user.name}</td>
                <td><Qualities qualities={props.user.qualities}/></td>
                <td>{props.user.profession.name}</td>
                <td>{props.user.completedMeetings}</td>
                <td>{props.user.rate}</td>
                <td>
                    <i className="bi bi-bookmark" ></i>
                </td>
                <td>
                    <button className={"btn btn-danger"} onClick={() => props.handleDelete(props.user._id)}>Удалить
                    </button>
                </td>
            </tr>
        </>
    )
}

export default User;