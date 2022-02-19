import React from 'react'
import {Link} from "react-router-dom";
import {Comment} from "../models/CommentModel";
import {PostModel} from "../models/PostModel";
import {useDispatch, useSelector} from "react-redux";
import {deletePostComment} from "../store/actions/postAction";
import {deleteUserComment} from "../store/actions/userActions";
import {RootState} from "store";

interface CommentsProps {
    comment: Comment;
    post: PostModel;
    deleteComment: typeof deletePostComment | typeof deleteUserComment;
}

export const Comments: React.FC<CommentsProps> = ({comment, post, deleteComment}) => {
    const authId = useSelector((state: RootState) => state.auth.user?.id);
    const action = useDispatch();

    const handleDeleteComment = () => {
        action(deleteComment(post, comment));
    }

    return (
        <div key={comment.id} className="post__comment">
            <p>
                <Link to={`/profile/${post.id}`} className="post__username">{comment.author.name}</Link>{comment.content}
            </p>
            {comment.author.id === authId ? <p className="post__comment--delete" onClick={handleDeleteComment}>Delete</p> : <></>}
        </div>
    );
}