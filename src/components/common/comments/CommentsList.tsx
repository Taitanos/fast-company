import React from "react";
import Comment from "./Comment";

type PropsType = {
    comments: any
    onRemove: (id: any) => void
}

const CommentsList: React.FC<PropsType> = ({comments, onRemove}) => {
    return (
        comments.map((comment: any) => (
            <Comment key={comment._id} {...comment} onRemove={onRemove}/>
        ))
    )
}

export default CommentsList;
