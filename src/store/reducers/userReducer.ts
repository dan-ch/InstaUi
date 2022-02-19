import {UserState} from "models/UserModel";
import {
    DELETE_POST,
    DELETE_USER_COMMENT,
    FOLLOW_USER,
    GET_USER_BY_ID,
    GET_USER_POSTS,
    LIKE_USER_POST,
    SET_AVATAR,
    SET_LOADING_USER,
    UserActionTypes
} from "../types/types";

const initialState: UserState = {
    user: null,
    posts: null,
    userLoading: false,
    currentPage: 0,
    hasNextPage: true,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case SET_LOADING_USER:
            return{
                ...state,
                userLoading: action.payload
            }
        case GET_USER_BY_ID:
            return {
                ...state,
                user: action.payload,
                posts: action.payload.posts,
                userLoading: false,
            }
        case GET_USER_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                currentPage: action.payload.currentPage,
                hasNextPage: action.payload.hasNextPage,
            }
        case FOLLOW_USER:
            return {
                ...state,
                user: action.payload,
                userLoading: false,
            }
        case SET_AVATAR:
            return {
                ...state,
                user: state.user && {
                    ...state.user,
                    avatar_url: action.payload,
                },
                userLoading: false,
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts!.filter(post => post.id !== action.payload),
                userLoading: false
            }
        case LIKE_USER_POST:
        case DELETE_USER_COMMENT:
            return {
                ...state,
                posts: state.posts!.map(post => post.id === action.payload.id ? action.payload : post),
            }
        default:
            return state;
    }
}
