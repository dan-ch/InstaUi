import { User } from "./UserModel";
import {Comment} from "./CommentModel";

export interface PostModel{
    id: number;
    description: string;
    img_url: string;
    tags: string;
    author_id: number;
    created_at: number;
    updated_at: Date;
    author: User;
    likes_count: number;
    comments_count: number;
    isLiked: boolean;
    comments: Comment[];
}

export interface PostState {
    posts: null | PostModel[],
    postLoading: boolean
    currentPage: number,
    hasNextPage: boolean
}

export interface AddPostModel{
    description: string,
    tags: string,
    photo: File | null;
}