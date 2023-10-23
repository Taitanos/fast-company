import React, {useEffect, useState} from "react";
import User from "./User";
import api from "../api";
import Pagination from "./Pagination";
import {paginate} from "../utils/paginate";
import GroupList from "./GroupList";
import {ProfessionType, ProfessionsTypeObject, UserType} from "../api/fake.api/user.api";
import SearchStatus from "./SearchStatus";


type PropsType = {
    handleDelete: (usersId: string) => void
    handleBookmark: (usersId: string) => void
    usersAll: UserType[]
}

function Users({handleDelete, handleBookmark, usersAll: allUsers}: PropsType) {

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [professions, setProfessions] = useState<undefined | ProfessionsTypeObject | ProfessionType[]>(undefined)
    const [selectedProf, setSelectedProf] = useState<undefined | ProfessionType>(undefined)

    const pageSize = 4

    useEffect(() => {
        api.professions.fetchAll().then((data: any) => setProfessions(data))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

    const handleProfessionSelect = (item: ProfessionType) => {
        setSelectedProf(item)
    }

    const handlePageChange = (pageIndex: number) => {
        setCurrentPage(pageIndex)
    }

    const filteredUsers = selectedProf ? allUsers.filter((user) => user.profession.name === selectedProf.name) : allUsers
    const count = filteredUsers.length

    const users = paginate(filteredUsers, currentPage, pageSize)

    const clearFilter = () => {
        setSelectedProf(undefined)
    }

    return (
        <div className={"d-flex"}>
            {professions && (
                <div className={"d-flex flex-column flex-shrink-0 p-3"}>
                    <GroupList items={professions}
                               onItemSelect={handleProfessionSelect}
                               selectedItem={selectedProf}
                    />
                    <button className={"btn btn-secondary m-2"} onClick={clearFilter}>Очистить</button>
                </div>
            )}
            <div className={"d-flex flex-column"}>
                <SearchStatus length={count}/>
                {count > 0 && (
                    <table className={"table"}>
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
                        {users.map((user) => (
                            <User user={user} onDelete={handleDelete} onChangeBookmark={handleBookmark}/>
                        ))}
                        </tbody>
                    </table>
                )}
                <div className={"d-flex justify-content-center"}>
                    <Pagination itemsCount={count} pageSize={pageSize} currentPage={currentPage}
                                onPageChange={handlePageChange}/>
                </div>
            </div>
        </div>
    )
}

export default Users;