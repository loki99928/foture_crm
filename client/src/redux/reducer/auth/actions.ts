import {InferActionTypes} from "../../store";
import {initialStateAuth, TUser} from "./index";
import {IResponseServer} from "../../../types/ApiUsersTypes";

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

export const CHECK_TEMPORARY_TOKEN_REQUEST = 'CRM/AUTH/CHECK_TEMPORARY_TOKEN_REQUEST'
export const CHECK_TEMPORARY_TOKEN_SUCCESS = 'CRM/AUTH/CHECK_TEMPORARY_TOKEN_SUCCESS'
export const CHECK_TEMPORARY_TOKEN_FAIL = 'CRM/AUTH/CHECK_TEMPORARY_TOKEN_FAIL'

export const CREATE_NEW_PASSWORD_REQUEST = 'CRM/AUTH/CREATE_NEW_PASSWORD_REQUEST'
export const CREATE_NEW_PASSWORD_SUCCESS = 'CRM/AUTH/CREATE_NEW_PASSWORD_SUCCESS'
export const CREATE_NEW_PASSWORD_FAIL = 'CRM/AUTH/CREATE_NEW_PASSWORD_FAIL'

export const LOGOUT_REQUEST = 'CRM/AUTH/LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'CRM/AUTH/LOGOUT_SUCCESS'

export const actionsAuth = {

    // сброс формы
    clearForm: () => ({type: AUTH_LOAD_FORM} as const),

    // регистрация пользователя
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
    registerUserFail: ({message}: IResponseServer) => (
        {
            type: REGISTER_USER_FAIL,
            payload: {message}
        } as const),

    // авторизация пользователя
    authUserRequest: ({email, password}: TUser) => ({
        type: AUTH_USER_REQUEST,
        payload: {
            user: {email, password}
        }
    } as const),
    authUserSuccess: ({userId, accessToken}: TUser) => ({
        type: AUTH_USER_SUCCESS,
        payload: {
            user: {userId, accessToken}
        }
    } as const),
    authUserFail: ({message}: IResponseServer) => ({
        type: AUTH_USER_FAIL,
        payload: {
            message: message
        }
    } as const),

    // аутентификация пользователя по токену
    authUserDataRequest: () => ({type: CHECK_AUTH_USER_REQUEST} as const),
    authUserDataSuccess: ({userId, email, accessToken, avatarUrl, role}: TUser) => ({
        type: CHECK_AUTH_USER_SUCCESS,
        payload: {
            user: {userId, email, accessToken, avatarUrl, role}
        }
    } as const),
    authUserDataFail: () => ({type: CHECK_AUTH_USER_FAIL} as const),

    // подтверждение почты пользователя
    confirmUserRequest: (hashUser: string | undefined) => ({
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

    // запрос на восстановление пароля
    forgetUserRequest: ({email}: TUser) => ({
        type: FORGET_USER_REQUEST,
        payload: {
            user: {email}
        }

    } as const),
    forgetUserSuccess: ({message}: IResponseServer) => ({
        type: FORGET_USER_SUCCESS,
        payload: {
            message: message
        }
    } as const),
    forgetUserFail: ({message}: IResponseServer) => ({
        type: FORGET_USER_FAIL,
        payload: {
            message: message
        }
    } as const),

    // проверка временного токена из ссылки на восстановление пароля
    checkTemporaryTokenRequest: (hashUser: string | undefined) => ({
        type: CHECK_TEMPORARY_TOKEN_REQUEST,
        payload: {hashUser}
    } as const),
    checkTemporaryTokenSuccess: ({message}: IResponseServer) => ({
        type: CHECK_TEMPORARY_TOKEN_SUCCESS,
        payload: {
            message: message
        }
    } as const),
    checkTemporaryTokenFail: ({message}: IResponseServer) => ({
        type: CHECK_TEMPORARY_TOKEN_FAIL,
        payload: {
            message: message
        }
    } as const),

    // запрос на создание нового пароля
    createNewPasswordResponse: ({password, double_password, hashUser}: any) => ({
        type: CREATE_NEW_PASSWORD_REQUEST,
        payload: {
            password, double_password, hashUser
        }
    } as const),
    createNewPasswordSuccess: ({message}: IResponseServer) => ({
        type: CREATE_NEW_PASSWORD_SUCCESS,
        payload: {
            message
        }
    } as const),
    createNewPasswordFail: ({message}: IResponseServer) => ({
        type: CREATE_NEW_PASSWORD_FAIL,
        payload: {
            message
        }
    } as const),

    // logout user
    logoutRequest: () => ({
        type: LOGOUT_REQUEST
    } as const),
    logoutSuccess: () => ({
        type: LOGOUT_SUCCESS
    } as const)
}

export type InitialStateType = typeof initialStateAuth
export type ActionTypeAuth = InferActionTypes<typeof actionsAuth>
