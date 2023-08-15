import React from "react";

type UsersType = {
    _id: string
    name: string
    profession: { _id: string; name: string; }
    qualities: { _id: string; name: string; color: string; }[]
    completedMeetings: number
    rate: number;
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
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.qualities.map(item => <span className={"badge m-1 bg-" + item.color}
                                                                  key={item._id}>{item.name}</span>)}</td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate}</td>
                            <td>
                                <button className={"btn btn-danger"} onClick={() => props.handleDelete(user._id)}>Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default Users;