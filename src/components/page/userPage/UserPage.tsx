import React, {useEffect, useState} from "react";
import api from "../../../api";
import {UsersType} from "../../../api/fake.api/user.api";
import QualitiesList from "../../ui/qualities/QualitiesList";
import {useNavigate} from "react-router-dom";

type PropsType = {
    userId: string
}

function UserPage ({userId}: PropsType) {
    const history = useNavigate()
    const [user, setUser] = useState <undefined | UsersType>();

    useEffect(() => {
        api.users.getById(userId).then((data: any) => setUser(data))
    }, [])

    const handleClick = () => {
        history("/users")
    }

    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>Профессия : {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities}/>
                <p>Встреч проведено: {user.completedMeetings}</p>
                <h2>Оценка: {user.rate}</h2>
                <button onClick={handleClick}>Все пользователи</button>
            </div>
        )
    } else {
        return <h1>Loading...</h1>
    }
}

export default UserPage;