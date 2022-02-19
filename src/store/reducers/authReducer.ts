import {AuthState} from "models/Authentication";
import {
    AuthActionsTypes,
    RESET_AUTH,
    SET_AVATAR,
    SET_LOADING,
    SET_NAME,
    SIGN_IN_SOCIAL,
    SIGN_OUT,
    SIGN_UP
} from "store/types/types";


export const initialState: AuthState = {
    user: null,
    authenticated: false,
    token: '',
    authLoading: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: AuthActionsTypes) => {
    switch(action.type){
        case SET_LOADING:
            return {
                ...state,
                authLoading: action.payload,
            }
        case SIGN_UP:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticated: true,
                authLoading: false,
            }
        case RESET_AUTH:
        case SIGN_OUT:
            return {
                ...state,
                token: '',
                authenticated: false,
                user: null,
                authLoading: false,
            }
        case SIGN_IN_SOCIAL:
            return {
                ...state,
                authLoading: false,
            }
        case SET_AVATAR:
            return {
                ...state,
                user: state.user && {
                    ...state.user,
                    avatar_url: action.payload,
                },
            }
        case SET_NAME:
            return {
                ...state,
                user: state.user && {
                    ...state.user,
                    name: action.payload,
                },
            }
        default:
            return state;
        
    }
 }