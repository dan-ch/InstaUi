import {
    ADD_COMMENT,
    DELETE_POST_COMMENT,
    LIKE_POST,
    PostActionsTypes,
    SET_LOADING_POST,
    SET_POSTS
} from "store/types/types";
import {RootState} from "store";
import {ThunkAction} from "redux-thunk";
import axios from "utils/axiosInstance";
import {PostModel} from "models/PostModel";
import {Comment} from "../../models/CommentModel";


export const setPosts = (page: number, passedPosts: PostModel[]): ThunkAction<void, RootState, null, PostActionsTypes> => {
    return dispatch => {
        try{axios.get("./posts", {
                params: {
                    page
                },
                headers: {
                  Accept: "application/json",
                },
              }).then((res)  => {
            //TODO sprawdzic czy nie ma bledu z passedPosts
                  const posts = [...passedPosts, ...res.data.data.data];
                  const hasNextPage = Boolean(res.data.data.next_page_url);
                  const currentPage = res.data.data.current_page;
                  console.log(hasNextPage);

                  console.log(res.data.data.next_page_url);
                  console.log(res.data.data);
                  dispatch({
                      type: SET_POSTS,
                      payload: {
                          posts,
                          currentPage,
                          hasNextPage,
                      }
                  })
              }).catch((error) => console.log(error));
        }
        catch (error: any) {
            console.log(error);
        }
        finally {
            setLoadingPost(false);
        }
    }
}

export const likePost = (post: PostModel): ThunkAction<void, RootState, null, PostActionsTypes> => {
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
                    type: LIKE_POST,
                    payload: post
                })
            }).catch((error) => console.log(error))
        }
        catch (error: any) {
            console.log(error);
        }
    }
}

export const addComment = (comment: string, post: PostModel, setLoading: React.Dispatch<React.SetStateAction<boolean>>): ThunkAction<void, RootState, null, PostActionsTypes> => {
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
                        type: ADD_COMMENT,
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

export const deletePostComment = (post: PostModel, comment: Comment): ThunkAction<void, RootState, null, PostActionsTypes> => {
    return dispatch => {
        try{
            console.log(comment.id);
            axios.delete(`./comments/${comment.id}`
            ).then((response) => {
                console.log(response);
                const comments = post.comments.filter((com) => com.id !== comment.id);
                console.log(comments);
                dispatch({
                    type: DELETE_POST_COMMENT,
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

export const setLoadingPost = (loadingValue: boolean): ThunkAction<void, RootState, null, PostActionsTypes> => {
    return dispatch => {
        try{
            dispatch({
                type: SET_LOADING_POST,
                payload: loadingValue
            });
        }
        catch (error: any) {
            console.log(error);
        }
    }
}