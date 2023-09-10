import React from "react";

type UserType = {
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
}

function User (props:PropsType) {
    return (
        <>
            <tr key={props.user._id}>
                <td>{props.user.name}</td>
                <td>{props.user.qualities.map(item => <span className={"badge m-1 bg-" + item.color}
                                                      key={item._id}>{item.name}</span>)}</td>
                <td>{props.user.profession.name}</td>
                <td>{props.user.completedMeetings}</td>
                <td>{props.user.rate}</td>
                <td>
                    <button className={"btn btn-danger"} onClick={() => props.handleDelete(props.user._id)}>Удалить
                    </button>
                </td>
            </tr>
        </>
    )
}

export default User;