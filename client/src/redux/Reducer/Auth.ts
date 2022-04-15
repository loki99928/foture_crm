import {ActionTypeAuth, InitialStateType} from "../Actions/Auth";

export let initialStateAuth = {
    userId: null as string | null,
    email: null as string | null,
    accessToken: null as string | null,
    isAuth: false as boolean | null,
    isLoad: false as boolean
}
const AuthReducer = (state = initialStateAuth, action: ActionTypeAuth): InitialStateType => {
    switch (action.type) {
        case 'CRM/AUTH/GET_USER_TOKEN':
            return {
                ...state,
                accessToken: action.data.accessToken
            }
        case 'CRM/AUTH/IS_AUTH':
            return {
                ...state,
                isAuth: action.isAuth,
            }
        case 'CRM/AUTH/SET_USER_DATA':
            return {
                ...state,
                userId: action.data.userId,
                email: action.data.email
            }
        case 'CRM/AUTH/IS_LOAD':
            return {
                ...state,
                isLoad: true
            }
        default:
            return state
    }
}

export default AuthReducer;