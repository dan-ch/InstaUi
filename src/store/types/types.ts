import { User } from 'models/UserModel';
import { PostModel } from 'models/PostModel';

export const SIGN_UP = "SIGN_UP";
export const SIGN_OUT = "SIGN_OUT";
export const SIGN_IN_SOCIAL = "SIGN_IN_SOCIAL";
export const SET_LOADING = "SET_LOADING";
export const RESET_AUTH = "RESET_AUTH";

export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const GET_USER_POSTS = "GET_USER_POSTS";
export const LIKE_USER_POST = "LIKE_USER_POST";
export const ADD_USER_COMMENT = "ADD_USER_POST";
export const FOLLOW_USER = "FOLLOW_USER";
export const SET_AVATAR = "SET_AVATAR";
export const SET_NAME = "SET_NAME";
export const DELETE_POST = "DELETE_POST";
export const SET_LOADING_USER = "SET_LOADING_USER";


export const SET_POSTS = "SET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_POST_COMMENT = "DELETE_POST_COMMENT";
export const DELETE_USER_COMMENT = "DELETE_USER_COMMENT";
export const SET_LOADING_POST = "SET_LOADING_POST";

// ----AUTHENTICATION----

interface SetUserAction {
    type: typeof SIGN_UP,
    payload: {
        user: User,
        token: string
    }
}

interface SignOutAction {
    type: typeof SIGN_OUT,
}

interface ResetAction {
    type: typeof RESET_AUTH,
}

interface SignInSocialAction {
    type: typeof SIGN_IN_SOCIAL,
    //payload: string;
}

// ----USER ACTIONS ----

interface GetUserByIdAction{
    type: typeof GET_USER_BY_ID,
    payload: User
}

interface GetUserPosts{
    type: typeof GET_USER_POSTS,
    payload: {
        posts: PostModel[],
        currentPage: number,
        hasNextPage: boolean,
    }
}

interface FollowUserAction{
    type: typeof FOLLOW_USER,
    payload: User
}

interface SetAvatarAction {
    type: typeof SET_AVATAR,
    payload: string;
}

interface SetNameAction {
    type: typeof SET_NAME,
    payload: string;
}

interface LikeUserPostAction{
    type: typeof  LIKE_USER_POST,
    payload: PostModel
}

interface AddUserComment{
    type: typeof ADD_USER_COMMENT,
    payload: PostModel
}

interface DeletePostAction {
    type: typeof DELETE_POST,
    payload: number
}

interface SetLoadingUserAction{
    type: typeof SET_LOADING_USER,
    payload: boolean;
}



// ----POST----

interface SetPostsAction {
    type: typeof SET_POSTS,
    payload: {
        posts: PostModel[],
        currentPage: number,
        hasNextPage: boolean,
    }
}


interface LikePostAction{
    type: typeof LIKE_POST,
    payload: PostModel
}

interface AddCommentAction{
    type: typeof ADD_COMMENT,
    payload: PostModel
}

interface DeletePostCommentAction{
    type: typeof DELETE_POST_COMMENT,
    payload: PostModel
}

interface DeleteUserCommentAction{
    type: typeof DELETE_USER_COMMENT,
    payload: PostModel
}

interface SetLoadingPostAction{
    type: typeof SET_LOADING_POST,
    payload: boolean;
}


// ----STATE----

interface SetLoadingAction {
    type: typeof SET_LOADING,
    payload: boolean
}


export type AuthActionsTypes = SetUserAction | SignOutAction | SignInSocialAction | SetLoadingAction | SetAvatarAction
    | SetNameAction | ResetAction;

export type  UserActionTypes = GetUserByIdAction | FollowUserAction | SetAvatarAction
    | SetNameAction | DeleteUserCommentAction | GetUserPosts | LikeUserPostAction | AddUserComment | DeletePostAction | SetLoadingUserAction;

export type PostActionsTypes = SetPostsAction | LikePostAction | AddCommentAction
    | DeletePostCommentAction | SetLoadingPostAction;