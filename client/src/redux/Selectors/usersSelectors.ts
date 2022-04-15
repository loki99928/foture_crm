import {AppStateType} from "../store";

export const getUsersId = (state: AppStateType) => {
    return state.AuthReducer.userId
}
export const getUsersEmail = (state: AppStateType) => {
    return state.AuthReducer.email
}
export const isAuth = (state: AppStateType) => {
    return state.AuthReducer.isAuth
}
export const getAccessToken = (state: AppStateType) => {
    return state.AuthReducer.accessToken
}
export const getIsLoad = (state: AppStateType) => {
    return state.AuthReducer.isLoad
}

export const getInitialized = (state: AppStateType) => {
    return state.AppReducer.initialized
}