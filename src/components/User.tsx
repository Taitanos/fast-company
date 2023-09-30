import React from "react";
import Bookmark from "./Bookmark";
import Qualitie from "./Qualitie";

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
    bookmark:boolean
}

type PropsType = {
    user: UserType
    handleDelete: (usersId: string) => void
    handleBookmark: (usersId: string) => void
}

function User (props:PropsType) {
    return (
        <>
            <tr key={props.user._id}>
                <td>{props.user.name}</td>
                <td>
                    {props.user.qualities.map(qual => (
                        <Qualitie key={qual._id} qualName={qual.name} qualColor={qual.color}/>
                        ))}
                    </td>
                <td>{props.user.profession.name}</td>
                <td>{props.user.completedMeetings}</td>
                <td>{props.user.rate}</td>
                <td><Bookmark
                    status={props.user.bookmark}
                    handleBookmark={()=> props.handleBookmark (props.user._id)}
                    /></td>
                <td>
                    <button className={"btn btn-danger"} onClick={() => props.handleDelete(props.user._id)}>Удалить
                    </button>
                </td>
            </tr>
        </>
    )
}

export default User;