import React from "react";
import Bookmark from "./Bookmark";
import Qualitie from "./Qualitie";
import {UserType} from "../api/fake.api/user.api";


type PropsType = {
    user: UserType
    onDelete: (usersId: string) => void
    onChangeBookmark: (usersId: string) => void
}

function User ({user, onDelete, onChangeBookmark}:PropsType) {
    return (
        <>
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                    {user.qualities.map(qual => (
                        <Qualitie key={qual._id} qualName={qual.name} qualColor={qual.color}/>
                        ))}
                    </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td><Bookmark
                    status={user.bookmark}
                    handleBookmark={()=> onChangeBookmark (user._id)}
                    /></td>
                <td>
                    <button className={"btn btn-danger"} onClick={() => onDelete(user._id)}>Удалить
                    </button>
                </td>
            </tr>
        </>
    )
}

export default User;