import {InferActionTypes} from "../../store";
import {initialStateAuth, TUser} from "./index";
import {
    IApiUserLoginData,
    IApiUserLoginResponse,
    IResponseServer,
    ResultStatusCodeEnum
} from "../../../types/ApiUsersTypes";

export const AUTH_LOAD_FORM = 'CRM/AUTH/AUTH_LOAD_FORM'

export const CHECK_AUTH_USER_REQUEST = 'CRM/AUTH/CHECK_AUTH_USER_REQUEST'
export const CHECK_AUTH_USER_SUCCESS = 'CRM/AUTH/CHECK_AUTH_USER_SUCCESS'
export const CHECK_AUTH_USER_FAIL = 'CRM/AUTH/CHECK_AUTH_USER_FAIL'

export const AUTH_USER_REQUEST = 'CRM/AUTH/AUTH_USER_REQUEST'
export const AUTH_USER_SUCCESS = 'CRM/AUTH/AUTH_USER_SUCCESS'
export const AUTH_USER_FAIL = 'CRM/AUTH/AUTH_USER_FAIL'

export const REGISTER_USER_REQUEST = 'CRM/AUTH/REGISTER_USER_REQUEST'
export const REGISTER_USER_SUCCESS = 'CRM/AUTH/REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAIL = 'CRM/AUTH/REGISTER_USER_FAIL'

export const CONFIRM_USER_REQUEST = 'CRM/AUTH/CONFIRM_USER_REQUEST'
export const CONFIRM_USER_SUCCESS = 'CRM/AUTH/CONFIRM_USER_SUCCESS'
export const CONFIRM_USER_FAIL = 'CRM/AUTH/CONFIRM_USER_FAIL'

export const FORGET_USER_REQUEST = 'CRM/AUTH/FORGET_USER_REQUEST'
export const FORGET_USER_SUCCESS = 'CRM/AUTH/FORGET_USER_SUCCESS'
export const FORGET_USER_FAIL = 'CRM/AUTH/FORGET_USER_FAIL'

export const actionsAuth = {

    clearForm: () => ({ type: AUTH_LOAD_FORM } as const),

    // REGISTER_USER
    registerUserRequest: ({email, password}: TUser) => ({
        type: REGISTER_USER_REQUEST,
        payload: {
            user: {email, password}
        }
    } as const),
    registerUserSuccess: ({message}: IResponseServer) => (
        {
            type: REGISTER_USER_SUCCESS,
            payload: {message}
        } as const),
    registerUserFail: ( {message}: IResponseServer) => (
        {
            type: REGISTER_USER_FAIL,
            payload: {message}
        } as const),


    // CONFIRM USER
    confirmUserRequest: (hashUser: string) => ({
        type: CONFIRM_USER_REQUEST,
        payload: {hashUser}
    } as const),
    confirmUserSuccess: ({message}: IResponseServer) => ({
        type: CONFIRM_USER_SUCCESS,
        payload: {
            message: message
        }
    } as const),
    confirmUserFail: ({message}: IResponseServer) => ({
        type: CONFIRM_USER_FAIL,
        payload: {
            message: message
        }
    } as const),

    // AUTH_USER
    authUserRequest: ({email, password, remember}: TUser) => ({
        type: AUTH_USER_REQUEST,
        payload: {
            user: {email, password, remember}
        }
    } as const),
    authUserSuccess: ({userId, accessToken}: TUser) => ({
        type: AUTH_USER_SUCCESS,
        payload: {
            user: { userId, accessToken }
        }
    } as const),
    authUserFail: (payload: any) => ({
        type: AUTH_USER_FAIL,
        payload: {
            message: payload.message
        }
    } as const),





    // CHECK_AUTH_USER
    authUserDataRequest: () => ({ type: CHECK_AUTH_USER_REQUEST } as const),
    authUserDataSuccess: ({userId, email, accessToken}: TUser) => ({
        type: CHECK_AUTH_USER_SUCCESS,
        payload: {
            user: {userId, email, accessToken}
        }
    } as const),
    authUserDataFail: () => ({ type: CHECK_AUTH_USER_FAIL } as const),

    // FORGET USER
    forgetUserRequest: ({email}: TUser) => ({
        type: FORGET_USER_REQUEST,
        payload: {
            user: {email}
        }
    } as const),
    forgetUserSuccess: () => ({ type: FORGET_USER_SUCCESS} as const),
    forgetUserFail: () => ({ type: FORGET_USER_FAIL} as const),
}

export type InitialStateType = typeof initialStateAuth
export type ActionTypeAuth = InferActionTypes<typeof actionsAuth>
