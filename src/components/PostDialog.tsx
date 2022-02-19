import React, {ChangeEvent, FC, MouseEvent, useState} from 'react';
import {PostModel} from "../models/PostModel";
import Avatar from "@mui/material/Avatar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {IconButton} from "@mui/material";
import 'App.scss';
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {useDispatch, useSelector} from "react-redux";
import {
    addComment,
    deletePostComment,
    likePost
} from "../store/actions/postAction";
import {addUserComment, deleteUserComment, likeUserPost, deletePost} from "../store/actions/userActions";
import {User} from "../models/UserModel";
import {Link} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { RootState } from 'store';
import {Comments} from "./Comments";
import moment from "moment";

interface PostDialogProps {
 post: PostModel;
 user: User;
 setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
 isOnWall : boolean;
}

export const PostDialog: FC<PostDialogProps> = ({post, setOpen, user, isOnWall}) => {
    const [comment, setComment] = useState("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [show, setShow] = useState(false);
    const [like, setLike] = useState(post.isLiked);
    const [likesCount, setLikesCount] = useState(post.likes_count);
    const [loading, setLoading] = useState(false);
    const authId = useSelector((state: RootState) => state.auth.user?.id);

    const action = useDispatch();
    const openMenu = Boolean(anchorEl);

    const toggleLike = () => {
        setLike(!like);
        like ? setLikesCount(likesCount - 1) : setLikesCount(likesCount + 1);
        isOnWall ? action(likePost(post)) : action(likeUserPost(post));
    }

    const toggle = () => {
        setShow(!show);
    };

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        action(deletePost(id));
        handleCloseMenu();
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
        setComment(event.target.value);
    }

    const handleAddComment = () => {
        setLoading(true);
        isOnWall ? action(addComment(comment, post, setLoading)) : action(addUserComment(comment, post, setLoading));
        setComment("");
    }

    const { id, author, description, likes_count, comments, img_url } = post;
    return (
        <div className="post-dialog">
        <div className="post-dialog__header">
            <div className="post-dialog__author">
                <Avatar alt={user.name} src={user.avatar_url} className="post-dialog__header__author__avatar" />
                <p  className="post-dialog__author-name">{user.name}</p>
            </div>
            {authId === post.author_id ? <IconButton className="post-dialog__menu" onClick={handleClick}>
                <MoreHorizIcon />
            </IconButton> : <></>}

        </div>

        <img src={img_url} alt={user.name} />
        <section className="post-dialog__content">
            <div className="post-dialog__buttons">
                {like ? <i className="fas fa-fire post-dialog__icon-filled" onClick={toggleLike}/> : <i className="fas fa-fire" onClick={toggleLike} />}
                <i className="far fa-comment post-dialog__icon" onClick={toggle}/>
                <i className="far fa-bookmark post-dialog__icon" />
            </div>

            <p className="post-dialog__likes">Likes: {likesCount}</p>
            <div className='post__description'><Link to={`/profile/${author.id}`} className="post__username post__username--author">{author.name}</Link>
                {description}</div>
            <div className="post-comments">
                {comments && comments.map(comment => (
                    <Comments key={comment.id} post={post} comment={comment}
                              deleteComment={isOnWall ? deletePostComment : deleteUserComment}/>)
                )}
            </div>
            <p className="post-dialog__update-time">{`created at ${moment(post.created_at*1000).format('YYYY/MM/DD')}`}</p>
            {show &&
            <article className="post-dialog__comment-container">
                <input className="post-dialog__input" placeholder="Add comment..." onChange={handleChange} value={comment!}/>
                {loading ? <CircularProgress size={30} /> : <button className="post-dialog__share-comment" onClick={handleAddComment}>Share</button>}
            </article>}
        </section>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
                "aria-labelledby": "basic-button",
            }}
        >
            {user && user.id === post.author_id && <MenuItem onClick={handleDelete}>Delete</MenuItem>}
            {user && user.id === post.author_id && <Link to={`/editPost`} state={{id: post.id}}><MenuItem>Edit</MenuItem></Link>}
            <MenuItem onClick={handleCloseMenu}>Cancel</MenuItem>
        </Menu>
        </div>
    );
 }