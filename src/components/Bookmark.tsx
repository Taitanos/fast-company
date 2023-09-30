import React from "react";


type PropsType = {
    status: boolean
    handleBookmark: () => void
}

function Bookmark(props: PropsType) {
    return (
        <i className={"bi bi-" + (props.status ? "bookmark-heart-fill" : "bookmark")} onClick={() => props.handleBookmark()}/>
    )
}

export default Bookmark;