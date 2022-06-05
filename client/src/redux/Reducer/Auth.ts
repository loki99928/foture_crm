import {ActionTypeAuth, InitialStateType} from "../Actions/Auth";

export let initialStateAuth = {
    userId: undefined as string | undefined,
    email: undefined as string | undefined,
    accessToken: undefined as string | undefined,
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