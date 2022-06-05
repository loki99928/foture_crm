import {InferActionTypes} from "../store";
import {initialStateAuth} from "../Reducer/Auth";

export const actions = {
    setUserData: (userId: string | undefined, email: string | undefined) => ({
        type: 'CRM/AUTH/SET_USER_DATA',
        data: {userId, email}
    } as const),
    getUserToken: (accessToken: string | undefined, refreshToken: string | undefined) => ({
        type: 'CRM/AUTH/GET_USER_TOKEN',
        data: {accessToken, refreshToken}
    } as const),
    toggleIsAuth: (isAuth: boolean) => ({type: 'CRM/AUTH/IS_AUTH', isAuth} as const),
    toggleIsLoad: () => ({type: 'CRM/AUTH/IS_LOAD'} as const),
    statusUserTokenNewPassword: (token: string) => ({
        type: 'CRM/AUTH/CHANGE_USER_TOKEN_NEW_PASSWORD',
        data: {token}
    } as const)
}

export type InitialStateType = typeof initialStateAuth
export type ActionTypeAuth = InferActionTypes<typeof actions>
