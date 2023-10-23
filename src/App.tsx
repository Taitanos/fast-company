import React, {useState} from "react";
import api from "./api";
import Users from "./components/Users";

function App() {

    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (usersId: string) => {
        setUsers(users.filter((user) => user._id !== usersId))
    }

    const handleBookmark = (usersId: string) => {
        setUsers(
            users.map((user) => {
                if (user._id === usersId) {
                    return {...user, bookmark: !user.bookmark}
                }
                return user
            })
        )
    }

    return (
        <div>
            <Users handleDelete={handleDelete} handleBookmark={handleBookmark} usersAll={users}/>
        </div>
    )
}

export default App;
