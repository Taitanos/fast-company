import React from "react";
import _ from "lodash"

type PropsType = {
    itemsCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageIndex: number) => void
}

function Pagination({itemsCount, pageSize, currentPage, onPageChange}: PropsType) {

    const pageCount = Math.ceil(itemsCount / pageSize)
    const pages = _.range(1, pageCount + 1)

    if (pageCount === 1) return null

    return (
        <nav>
            <ul className={"pagination"}>
                {pages.map((page) => (
                    <li className={"page-item " + (page === currentPage ? "active" : "")} key={page}>
                        <a className={"page-link"} onClick={() => onPageChange(page)}>{page}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;