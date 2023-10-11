import React, {useState} from "react";
import api from "./api";
import Users from "./components/Users";
import SearchStatus from "./components/SearchStatus";

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

    const renderPhase = (number: number) => {
        const lastOne = Number(number.toString().slice(-1))
        if (number > 4 && number < 15) return "человек тусанет"
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанет"
        if (lastOne === 1) return "человек тусанет"
        return "человек тусанет"
    }


    return (
        <div>
            <SearchStatus length={users.length} renderPhase={renderPhase}/>
            <Users handleDelete={handleDelete} handleBookmark={handleBookmark} usersAll={users}/>
        </div>
    )
}

export default App;
