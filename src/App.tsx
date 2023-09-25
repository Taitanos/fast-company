import React, {useState} from "react";
import api from "./api";
import Users from "./components/Users";

function App() {

    const [users, setUsers] = useState(api.users.fetchAll())
    const [bookmark, setBookmark] = useState(false)

    const handleDelete = (usersId: string) => {
        setUsers(users.filter((user) => user._id !== usersId))
    }

    const handleBookmark = () => {
        setBookmark (!bookmark);
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
            <Users handleDelete={handleDelete} renderPhase={renderPhase} handleBookmark={handleBookmark} users={users}/>
        </div>
    )
}

export default App;
