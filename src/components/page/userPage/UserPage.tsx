import React, {useEffect, useState} from "react";
import api from "../../../api";
import {UsersType} from "../../../api/fake.api/user.api";


import QualitiesCard from "../../ui/QualitiesCard";
import MeetingsCard from "../../ui/MeetingsCard";
import Comments from "../../ui/Comments";
import UserCard from '../../ui/UserCard';

type PropsType = {
    userId: any
}

const UserPage: React.FC<PropsType> = ({userId}) => {

    const [user, setUser] = useState<undefined | UsersType>();

    useEffect(() => {
        api.users.getById(userId).then((data: any) => setUser(data))
    }, [])


    if (user) {
        return (
            <div className={"container"}>
                <div className={"row gutters-sm"}>
                    <div className={"col-md mb-3"}>
                        <UserCard user={user}/>
                        <QualitiesCard data={user.qualities}/>
                        <MeetingsCard value={user.completedMeetings}/>
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>loading...</h1>
    }
};

export default UserPage;