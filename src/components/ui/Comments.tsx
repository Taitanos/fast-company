import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import api from "../../api";
import {orderBy} from "lodash";
import CommentsList, {AddCommentForm} from "../common/comments";


const Comments = () => {

    const {userId} = useParams();
    const [comments, setComments] = useState<any>([]);
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data: any) => setComments(data));
    }, []);
    const handleSubmit = (data: any) => {
        api.comments
            .add({...data, pageId: userId})
            .then((data: any) => setComments([...comments, data]));
    };
    const handleRemoveComment = (id: any) => {
        api.comments.remove(id).then((id: any) => {
            setComments(comments.filter((x: any) => x._id !== id));
        });
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className={'card mb-2'}>
                {' '}
                <div className={'card-body '}>
                    <AddCommentForm onSubmit={handleSubmit}/>
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className={'card mb-3'}>
                    <div className={'card-body '}>
                        <h2>Comments</h2>
                        <hr/>
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Comments;
