import {PostModel} from "./PostModel";

export interface User {
    id: number;
    name: string;
    email: string;
    avatar_url: string;
    isFollowed: boolean;
    posts_count: number;
    followers_count: number;
    followed_count: number;
    comments_count: number;
    posts: PostModel[];
}

export interface UserState{
    user: null | User;
    userLoading: boolean;
    posts: null | PostModel[];
    currentPage: number,
    hasNextPage: boolean,
}