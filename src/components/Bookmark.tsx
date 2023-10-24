import React from "react";


type PropsType = {
    status: boolean
    handleBookmark: () => void
}

function Bookmark({status, handleBookmark}: PropsType) {
    return (
        <i className={"bi bi-" + (status ? "bookmark-heart-fill" : "bookmark")} onClick={() => handleBookmark()}/>
    )
}

export default Bookmark;