import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {
    DELETE_USER_COMMENT,
    FOLLOW_USER,
    GET_USER_BY_ID,
    GET_USER_POSTS,
    UserActionTypes, LIKE_USER_POST, ADD_USER_COMMENT, DELETE_POST, SET_LOADING_USER
} from "../types/types";
import axios from "utils/axiosInstance";
import {User} from "../../models/UserModel";
import {PostModel} from "../../models/PostModel";
import {Comment} from "../../models/CommentModel";



export const getUserById = (id: number): ThunkAction<void, RootState, null, UserActionTypes> => {
    return dispatch => {
        try{
            axios.get(`./users/${id}`, {
                headers: {
                    Accept: "application/json",
                },
            }).then((response) => {
                const user = response.data.data;
                dispatch({
                    type: GET_USER_BY_ID,
                    payload: user as User
                })
            }).catch((error) => console.log(error))
        }
        catch (error: any) {
            console.log(error);
        }
    }
}

export const getUserPosts = (id: number, passedPosts: PostModel[], page: number): ThunkAction<void, RootState, null, UserActionTypes> => {
    return dispatch => {
        try{
            axios.get(`./users/${id}/posts`, {
                params:{
                    page
                },
                headers: {
                    Accept: "application/json",
                },
            }).then((res) => {
                //TODO sprawdzic czy nie ma bledu
                const posts = [...passedPosts, ...res.data.data.data];
                const hasNextPage = Boolean(res.data.data.next_page_url);
                const currentPage = res.data.data.current_page;
                dispatch({
                    type: GET_USER_POSTS,
                    payload: {
                        posts,
                        currentPage,
                        hasNextPage
                    }
                })
            }).catch((error) => console.log(error))
        }
        catch (error: any) {
            console.log(error);
        }
    }
}

export const followUser = (user: User): ThunkAction<void, RootState, null, UserActionTypes> => {
    return dispatch => {
        try {
            axios.head(`./users/${user.id}/follow`).then(() => {
                user.followers_count += user.isFollowed ? -1 : +1;
                user.isFollowed = !user.isFollowed;
                dispatch({
                    type: FOLLOW_USER,
                    payload: user
                })
            }).catch((error) => console.log(error))
        } catch (error: any) {
            console.log(error);
        }
    }
}


export const deletePost = (id: number): ThunkAction<void, RootState, null, UserActionTypes> => {
    return dispatch => {
        dispatch(setLoadingUser(true));
        try{
            axios.delete(`/posts/${id}`, {
                headers: {
                    Accept: "application/json",
                },
            }).then(()  => {
                dispatch({
                    type: DELETE_POST,
                    payload: id
                })
            }).catch(error => console.log(error))
        }
        catch (error: any) {
            console.log(error);
        }
        finally {
            setLoadingUser(false);
        }
    }
}

export const deleteUserComment = (post: PostModel, comment: Comment): ThunkAction<void, RootState, null, UserActionTypes> => {
    return dispatch => {
        try{
            axios.delete(`./comments/${comment.id}`
            ).then((response) => {
                console.log(response);
                const comments = post.comments.filter((com) => com.id !== comment.id);
                dispatch({
                    type: DELETE_USER_COMMENT,
                    payload: {
                        ...post,
                        comments
                    },
                })
            }).catch((error) => console.log(error));
        }
        catch (error: any) {
            console.log(error);
        }
    }
}

export const addUserComment = (comment: string, post: PostModel, setLoading: React.Dispatch<React.SetStateAction<boolean>>): ThunkAction<void, RootState, null, UserActionTypes> => {
    return dispatch => {
        try{
            axios.post("./comments", {content: comment, post_id: post.id}, {

            }).then((response) => {
                console.log(response);
                const location = response.data.data.location;
                axios.get(`.${location}`).then((response) => {
                    post.comments.push(response.data.data);
                    console.log(response);
                    dispatch({
                        type: ADD_USER_COMMENT,
                        payload: post
                    })
                    setLoading(false);
                }).catch((error) => console.log(error))
            }).catch((error) => console.log(error));
        }
        catch (error: any) {
            console.log(error);
        }
    }
}

export const likeUserPost = (post: PostModel): ThunkAction<void, RootState, null, UserActionTypes> => {
    return dispatch => {
        try{
            axios.head(`/posts/${post.id}/like`, {
                headers: {
                    Accept: "application/json",
                },
            }).then(()  => {
                post.likes_count += post.isLiked ? -1 : 1;
                post.isLiked = !post.isLiked;
                dispatch({
                    type: LIKE_USER_POST,
                    payload: post
                })
            }).catch((error) => console.log(error))
        }
        catch (error: any) {
            console.log(error);
        }
    }
}

export const setLoadingUser = (loadingValue: boolean): ThunkAction<void, RootState, null, UserActionTypes> => {
    return dispatch => {
        try{
            dispatch({
                type: SET_LOADING_USER,
                payload: loadingValue
            });
        }
        catch (error: any) {
            console.log(error);
        }
    }
}