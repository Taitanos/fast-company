import React, {useEffect, useState} from 'react';
import api from "../../../api";
import Pagination from "../../common/Pagination";
import {paginate} from "../../../utils/paginate";
import GroupList from "../../common/GroupList";
import {ProfessionType, ProfessionsTypeObject, UsersType} from "../../../api/fake.api/user.api";
import SearchStatus from "../../ui/SearchStatus";
import UserTable from "../../ui/UserTable";
import _ from "lodash"


export type SortByType = {
    path: string
    order: "asc" | "desc"
}

function UsersListPage() {

    const pageSize = 4
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [professions, setProfessions] = useState<undefined | ProfessionsTypeObject | ProfessionType[]>(undefined)
    const [selectedProf, setSelectedProf] = useState<undefined | ProfessionType>(undefined)
    const [sortBy, setSortBy] = useState<SortByType>({path: 'name', order: 'asc'})
    const [users, setUsers] = useState<UsersType[] | undefined>(undefined)
    const [searchQuery, setSearchQuery] = useState<string>("")

    useEffect(() => {
        api.users.fetchAll().then((data:any) => setUsers(data))
    }, [])

    useEffect(() => {
        api.professions.fetchAll().then((data: any) => setProfessions(data))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf, searchQuery])

    const handleDelete = (usersId: string) => {
        if (users) {
            setUsers(users.filter((user: UsersType) => user._id !== usersId))
        }
    }

    const handleBookmark = (usersId: string) => {
        if (users) {
            setUsers(
                users.map((user: UsersType) => {
                    if (user._id === usersId) {
                        return {...user, bookmark: !user.bookmark}
                    }
                    return user
                })
            )
        }
    }

    const handleProfessionSelect = (item: ProfessionType) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedProf(item)
    }

    const handlePageChange = (pageIndex: number) => {
        setCurrentPage(pageIndex)
    }

    const handleSort = (item: SortByType) => {
        setSortBy(item)
    }

    const handleSearchQuery: React.ChangeEventHandler<HTMLInputElement> = ({target}) => {
        setSelectedProf(undefined)
        setSearchQuery(target.value)
    }

    if (users) {

        const filteredUsers = searchQuery ?
             users.filter((user) => user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
            : selectedProf
            ? users.filter(
                (user) => user.profession.name === selectedProf.name
            )
            : users

        const count = filteredUsers.length

        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

        const usersCrop = paginate(sortedUsers, currentPage, pageSize)

        const clearFilter = () => {
            setSearchQuery("")
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
                    <input type={"text"} name={"searchQuery"} placeholder={"Search..."} onChange={handleSearchQuery} value={searchQuery}/>
                    {count > 0 && (
                        <UserTable users={usersCrop} onDelete={handleDelete} onChangeBookmark={handleBookmark}
                                   onSort={handleSort} selectedSort={sortBy}/>
                    )}
                    <div className={"d-flex justify-content-center"}>
                        <Pagination itemsCount={count} pageSize={pageSize} currentPage={currentPage}
                                    onPageChange={handlePageChange}/>
                    </div>
                </div>
            </div>
        )
    } else
    return <>"loading..."</>
}

export default UsersListPage;