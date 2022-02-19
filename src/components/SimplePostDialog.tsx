import React from 'react'
import Avatar from "@mui/material/Avatar";
import {Link} from "react-router-dom";
import {PostModel} from "../models/PostModel";

interface SimplePostDialogProps {
    post: PostModel
}

export const SimplePostDialog: React.FC<SimplePostDialogProps> = ({post}) => {
    return (<div className="post-dialog">
        <div className="post-dialog__header">
            <div className="post-dialog__author">
                <Avatar alt={post.author.name} src={post.author.avatar_url} className="post-dialog__header__author__avatar" />
                <Link to={`/profile/${post.author.id}`} className="post__username simple-post-user">{post.author.name}</Link>
            </div>
            <></>
        </div>
        <img src={post.img_url} alt={post.img_url} />
        <section className="post-dialog__content">
        <p className="post-dialog__likes">Likes: {post.likes_count}</p>
        <div className='post__description'><Link to={`/profile/${post.author.id}`} className="post__username post__username--author">{post.author.name}</Link>
            {post.description}</div>
        </section>

    </div>);
}