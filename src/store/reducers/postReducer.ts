import {PostState} from "models/PostModel";
import {
    ADD_COMMENT,
    DELETE_POST_COMMENT,
    LIKE_POST,
    PostActionsTypes,
    SET_LOADING_POST,
    SET_POSTS
} from "store/types/types";
//import update from 'react-addons-update';


const initialState: PostState = {
    posts: null,
    postLoading: false,
    currentPage: 0,
    hasNextPage: true
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: PostActionsTypes) => {
    switch(action.type){
        case SET_LOADING_POST:
            return {
                ...state,
                postLoading: action.payload
            }
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                currentPage: action.payload.currentPage,
                hasNextPage: action.payload.hasNextPage,
                postLoading: false,
            }
        case LIKE_POST:
        case ADD_COMMENT:
        case DELETE_POST_COMMENT:
            return {
                ...state,
                posts: state.posts!.map(post => post.id === action.payload.id ? action.payload : post),
            }
        default:
            return state;

    }
 }

