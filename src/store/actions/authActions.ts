import axios from "utils/axiosInstance";
import {passwordResetData, signInData, signUpData} from "models/Authentication";
import {ThunkAction} from "redux-thunk";
import {RootState} from "store";
import {AuthActionsTypes, RESET_AUTH, SET_AVATAR, SET_LOADING, SET_NAME, SIGN_OUT, SIGN_UP} from "store/types/types";
//import {passwordChange} from


export const signUp = (data: signUpData): ThunkAction<void, RootState, null, AuthActionsTypes> => {
    return dispatch => {
        dispatch(setLoadingAuth(true));
        try{
           axios.post('./register', data
           ).then
           ((response: any) => {
            const user = response.data.data.user;
            const token = response.data.data.token;

            dispatch({
                type: SIGN_UP,
                payload: {
                    user,
                    token
                }
            })
           }).catch((error) => console.log(error))
        }
        catch (error: any) {
            console.log(error);
        }
    }
}

export const signIn = (data: signInData): ThunkAction<void, RootState, null, AuthActionsTypes> => {
    return dispatch => {
        dispatch(setLoadingAuth(true));
        try{
           axios.post('/login', data
           ).then
           ((response) => {
               console.log(response)

                const user = response.data.data.user;
                const token = response.data.data.token;

                dispatch({
                    type: SIGN_UP,
                    payload: {
                        user,
                        token
                    }
                })
            //setLoading(false);
           }).catch((error) => console.log(error))
        }
        catch (error: any) {
            console.log(error);
        }
    }
}

export const signOut = (): ThunkAction<void, RootState, null, AuthActionsTypes> => {
    return dispatch => {
        dispatch(setLoadingAuth(true));
        try{
            axios.post('./logout').then(() => {
                dispatch({
                    type: SIGN_OUT
                })
            }).catch((error) => {
                console.log(error)
            })
        }
        catch (error: any) {
            console.log(error);
        }
    }
}

export const signInSocial = (passedToken: string, social: "google" | "github"): ThunkAction<void, RootState, null, AuthActionsTypes> => {
    return dispatch => {
        dispatch(setLoadingAuth(true));
        try{
            axios.get(`./login/${social}/callback`,
                {
                    params: {
                        token: passedToken
                    }
                }).then((response) => {
                    console.log(response)
                    const user = response.data.data.user;
                    const token = response.data.data.token;
                    console.log(token);
                    dispatch({
                        type: SIGN_UP,
                        payload: {
                            user,
                            token
                        }
                    })
                console.log(response.data.data);
            })
        }
        catch (error: any) {
            console.log(error);
        }
    }
}


export const passwordReset = (data: passwordResetData): ThunkAction<void, RootState, null, AuthActionsTypes> => {
    return dispatch => {
        try {
            axios.post('./password-change', data
            ).then
            ((response: any) => {
                console.log(response);
            }).catch((error) => console.log(error))
        } catch (error: any) {
            console.log(error);
        }
    }
}

export const setAvatar = (loadedFile: File): ThunkAction<void, RootState, null, AuthActionsTypes> => {
    return dispatch => {
        try{
            const loadedAvatar = new FormData();
            loadedAvatar.append('avatar', loadedFile);
            axios.post('./users', loadedAvatar, {
                params: {
                    _method: 'patch',
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }}
            ).then((response) => {
                console.log(response.data.data.avatar_url);
                dispatch({
                    type: SET_AVATAR,
                    payload: response.data.data.avatar_url
                });
            }).catch((error) => console.log(error));

        }
        catch (error: any) {
            console.log(error);
        }
    }
}

export const changeUsername = (name: string): ThunkAction<void, RootState, null, AuthActionsTypes> => {
    return dispatch => {
        try{
            const newName = new FormData();
            newName.append('name', name);
            axios.post('./users', newName, {
                params: {
                    _method: 'patch',
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }}
            ).then((response) => {
                const changedUsername = response.data.data.name;
                dispatch({
                    type: SET_NAME,
                    payload: changedUsername
                });
            }).catch((error) => console.log(error));

        }
        catch (error: any) {
            console.log(error);
        }
    }
}





export const setLoadingAuth = (loadingValue: boolean): ThunkAction<void, RootState, null, AuthActionsTypes> => {
    return dispatch => {
        try {
            dispatch({
                type: SET_LOADING,
                payload: loadingValue
            });
        } catch (error: any) {
            console.log(error);
        }
    }
}

export const resetAuth = (): ThunkAction<void, RootState, null, AuthActionsTypes> => {
        return dispatch => {
            try {
                dispatch({
                    type: RESET_AUTH,
                });
            } catch (error: any) {
                console.log(error);
            }
        }
    }



