import {StateType} from "../../store";

export const isAuth = (state: StateType) => {
    return state.auth.isAuth
}

export const getUser = (state: StateType) => {
    return state.auth.user
}

export const getMessage = (state: StateType) => {
    return state.auth.message
}

export const getStatus = (state: StateType) => {
    return state.auth.status
}

export const getIsLoad = (state: StateType) => {
    return state.auth.isLoad
}
