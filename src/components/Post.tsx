import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Avatar from "@mui/material/Avatar";
import "App.scss";
import React, {useEffect, useState} from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {IconButton} from "@mui/material";
import {Modal} from "./Modal";
import {PostModel} from "../models/PostModel";
import {PostDialog} from "./PostDialog";
import {useDispatch, useSelector} from "react-redux";
import {deletePostComment, likePost} from "../store/actions/postAction";
import {Link} from 'react-router-dom';
import {Comment} from "../models/CommentModel";
import userReducer from "../store/reducers/userReducer";
import {RootState} from "../store";
import {Comments} from "./Comments";
import moment from "moment";

interface PostProps {
  post: PostModel
}

export const Post: React.FC<PostProps> = ({
    post
}) => {
  const action = useDispatch();
  const { description, isLiked, likes_count, comments, author} = post;
  const [openPost, setOpenPost] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const authId = useSelector((state: RootState) => state.auth.user?.id);
  const open = Boolean(anchorEl);
  useEffect(() => {

  }, [isLiked])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    handleClose();
    setOpenPost(true);
  }

  const toggle = () => {
    action(likePost(post));
  };

  return (
    <div className="post">
      <div className="post__nav">
        <div>
          <Avatar alt="post" src={author.avatar_url} />
          <Link to={`/profile/${author.id}`} className="post__username">{author.name}</Link>
        </div>
        <IconButton onClick={handleClick}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleOpen}>Redirect to post</MenuItem>
          <MenuItem onClick={handleClose}>Stop following</MenuItem>
          <MenuItem onClick={handleClose}>Cancel</MenuItem>
        </Menu>
      </div>
      <div>
        <img className="post__img" src={post.img_url} alt="instaphoto" />
        <div className="post__info">
          <div className="post__buttons">
            {isLiked ? <i className="fas fa-fire post-icon post-icon--filled" onClick={toggle}/> :
                <i className="fas fa-fire post-icon" onClick={toggle} />}
            <i className="far fa-bookmark post-icon" />
          </div>

          <p className="post-likes">Likes: {likes_count}</p>

          <div className='post__description'><Link to={`/profile/${author.id}`} className="post__username post__username--author">{author.name}</Link>
            {description}</div>
          <div className="post-comments">
            {comments && comments.slice(0,3).map(comment =>
                <Comments key={comment.id} comment={comment} post={post} deleteComment={deletePostComment}/>
            )}
          </div>

          <p className="post-creation-date">{`created at ${moment(post.created_at*1000).format('YYYY/MM/DD')}`}</p>
        </div>
      </div>
      <Modal open={openPost} setOpen={setOpenPost} fullWidth={true} maxWidth="sm" children={<PostDialog post={post} user={post.author} setOpen={setOpenPost} isOnWall={true}/>} />
    </div>
  );
};
