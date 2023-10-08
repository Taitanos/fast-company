import React, {useEffect, useState} from "react";
import User from "./User";
import api from "../api";
import Pagination from "./Pagination";
import {paginate} from "../utils/paginate";
import GroupList from "./GroupList";

type ProfessionalType = {
    _id: string
    name: string
}

type QualitieType = {
    _id: string
    name: string
    color: string
}

export type UserType = {
    _id: string
    name: string
    profession: ProfessionalType
    qualities: QualitieType[]
    completedMeetings: number
    rate: number
    bookmark: boolean
}

type PropsType = {
    handleDelete: (usersId: string) => void
    renderPhase: (number: number) => "человек тусанет" | "человека тусанет"
    handleBookmark: (usersId: string) => void
    users: UserType[]
}

function Users(props: PropsType) {

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [professions, setProfessions] = useState()

    const count = props.users.length
    const pageSize = 4

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])

    const handleProfessionSelect = () => {

    }

    const handlePageChange = (pageIndex: number) => {
        setCurrentPage(pageIndex)
    }
    const users = paginate(props.users, currentPage, pageSize)

    return (
        <>
            {professions && <GroupList items={professions}
                                       onItemSelect={handleProfessionSelect}
                                       valueProperty={"_id"}
                                       contentProperty={"name"}
            />}
            {count > 0 && (
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
                    {users.map((user) => (
                        <User user={user} onDelete={props.handleDelete} onChangeBookmark={props.handleBookmark}/>
                    ))}
                    </tbody>
                </table>
            )}
            <Pagination itemsCount={count} pageSize={pageSize} currentPage={currentPage}
                        onPageChange={handlePageChange}/>
        </>
    )
}

export default Users;