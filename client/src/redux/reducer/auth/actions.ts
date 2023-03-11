import {InferActionTypes} from "../../store";
import {initialStateAuth, TUser} from "./index";
import {IResponseServer} from "../../../types/ApiUsersTypes";

export enum authEnum {
    AUTH_LOAD_FORM = 'CRM/AUTH/AUTH_LOAD_FORM',
    CHECK_AUTH_USER_REQUEST = 'CRM/AUTH/CHECK_AUTH_USER_REQUEST',
    CHECK_AUTH_USER_SUCCESS = 'CRM/AUTH/CHECK_AUTH_USER_SUCCESS',
    CHECK_AUTH_USER_FAIL = 'CRM/AUTH/CHECK_AUTH_USER_FAIL',
    AUTH_USER_REQUEST = 'CRM/AUTH/AUTH_USER_REQUEST',
    AUTH_USER_SUCCESS = 'CRM/AUTH/AUTH_USER_SUCCESS',
    AUTH_USER_FAIL = 'CRM/AUTH/AUTH_USER_FAIL',
    REGISTER_USER_REQUEST = 'CRM/AUTH/REGISTER_USER_REQUEST',
    REGISTER_USER_SUCCESS = 'CRM/AUTH/REGISTER_USER_SUCCESS',
    REGISTER_USER_FAIL = 'CRM/AUTH/REGISTER_USER_FAIL',
    CONFIRM_USER_REQUEST = 'CRM/AUTH/CONFIRM_USER_REQUEST',
    CONFIRM_USER_SUCCESS = 'CRM/AUTH/CONFIRM_USER_SUCCESS',
    CONFIRM_USER_FAIL = 'CRM/AUTH/CONFIRM_USER_FAIL',
    FORGET_USER_REQUEST = 'CRM/AUTH/FORGET_USER_REQUEST',
    FORGET_USER_SUCCESS = 'CRM/AUTH/FORGET_USER_SUCCESS',
    FORGET_USER_FAIL = 'CRM/AUTH/FORGET_USER_FAIL',
    CHECK_TEMPORARY_TOKEN_REQUEST = 'CRM/AUTH/CHECK_TEMPORARY_TOKEN_REQUEST',
    CHECK_TEMPORARY_TOKEN_SUCCESS = 'CRM/AUTH/CHECK_TEMPORARY_TOKEN_SUCCESS',
    CHECK_TEMPORARY_TOKEN_FAIL = 'CRM/AUTH/CHECK_TEMPORARY_TOKEN_FAIL',
    CREATE_NEW_PASSWORD_REQUEST = 'CRM/AUTH/CREATE_NEW_PASSWORD_REQUEST',
    CREATE_NEW_PASSWORD_SUCCESS = 'CRM/AUTH/CREATE_NEW_PASSWORD_SUCCESS',
    CREATE_NEW_PASSWORD_FAIL = 'CRM/AUTH/CREATE_NEW_PASSWORD_FAIL',
    LOGOUT_REQUEST = 'CRM/AUTH/LOGOUT_REQUEST',
    LOGOUT_SUCCESS = 'CRM/AUTH/LOGOUT_SUCCESS'
}


export const actionsAuth = {

    // сброс формы
    clearForm: () => ({type: authEnum.AUTH_LOAD_FORM} as const),

    // регистрация пользователя
    registerUserRequest: ({email, password}: TUser) => ({
        type: authEnum.REGISTER_USER_REQUEST,
        payload: {
            user: {email, password}
        }
    } as const),
    registerUserSuccess: ({message}: IResponseServer) => (
        {
            type: authEnum.REGISTER_USER_SUCCESS,
            payload: {message}
        } as const),
    registerUserFail: ({message}: IResponseServer) => (
        {
            type: authEnum.REGISTER_USER_FAIL,
            payload: {message}
        } as const),

    // авторизация пользователя
    authUserRequest: ({email, password}: TUser) => ({
        type: authEnum.AUTH_USER_REQUEST,
        payload: {
            user: {email, password}
        }
    } as const),
    authUserSuccess: ({userId, accessToken}: TUser) => ({
        type: authEnum.AUTH_USER_SUCCESS,
        payload: {
            user: {userId, accessToken}
        }
    } as const),
    authUserFail: ({message}: IResponseServer) => ({
        type: authEnum.AUTH_USER_FAIL,
        payload: {
            message: message
        }
    } as const),

    // аутентификация пользователя по токену
    authUserDataRequest: () => ({type: authEnum.CHECK_AUTH_USER_REQUEST} as const),
    authUserDataSuccess: ({userId, email, accessToken, avatarUrl, role}: TUser) => ({
        type: authEnum.CHECK_AUTH_USER_SUCCESS,
        payload: {
            user: {userId, email, accessToken, avatarUrl, role}
        }
    } as const),
    authUserDataFail: () => ({type: authEnum.CHECK_AUTH_USER_FAIL} as const),

    // подтверждение почты пользователя
    confirmUserRequest: (hashUser: string | undefined) => ({
        type: authEnum.CONFIRM_USER_REQUEST,
        payload: {hashUser}
    } as const),
    confirmUserSuccess: ({message}: IResponseServer) => ({
        type: authEnum.CONFIRM_USER_SUCCESS,
        payload: {
            message: message
        }
    } as const),
    confirmUserFail: ({message}: IResponseServer) => ({
        type: authEnum.CONFIRM_USER_FAIL,
        payload: {
            message: message
        }
    } as const),

    // запрос на восстановление пароля
    forgetUserRequest: ({email}: TUser) => ({
        type: authEnum.FORGET_USER_REQUEST,
        payload: {
            user: {email}
        }

    } as const),
    forgetUserSuccess: ({message}: IResponseServer) => ({
        type: authEnum.FORGET_USER_SUCCESS,
        payload: {
            message: message
        }
    } as const),
    forgetUserFail: ({message}: IResponseServer) => ({
        type: authEnum.FORGET_USER_FAIL,
        payload: {
            message: message
        }
    } as const),

    // проверка временного токена из ссылки на восстановление пароля
    checkTemporaryTokenRequest: (hashUser: string | undefined) => ({
        type: authEnum.CHECK_TEMPORARY_TOKEN_REQUEST,
        payload: {hashUser}
    } as const),
    checkTemporaryTokenSuccess: ({message}: IResponseServer) => ({
        type: authEnum.CHECK_TEMPORARY_TOKEN_SUCCESS,
        payload: {
            message: message
        }
    } as const),
    checkTemporaryTokenFail: ({message}: IResponseServer) => ({
        type: authEnum.CHECK_TEMPORARY_TOKEN_FAIL,
        payload: {
            message: message
        }
    } as const),

    // запрос на создание нового пароля
    createNewPasswordResponse: ({password, double_password, hashUser}: any) => ({
        type: authEnum.CREATE_NEW_PASSWORD_REQUEST,
        payload: {
            password, double_password, hashUser
        }
    } as const),
    createNewPasswordSuccess: ({message}: IResponseServer) => ({
        type: authEnum.CREATE_NEW_PASSWORD_SUCCESS,
        payload: {
            message
        }
    } as const),
    createNewPasswordFail: ({message}: IResponseServer) => ({
        type: authEnum.CREATE_NEW_PASSWORD_FAIL,
        payload: {
            message
        }
    } as const),

    // logout user
    logoutRequest: () => ({
        type: authEnum.LOGOUT_REQUEST
    } as const),
    logoutSuccess: () => ({
        type: authEnum.LOGOUT_SUCCESS
    } as const)
}

export type InitialStateType = typeof initialStateAuth
export type ActionTypeAuth = InferActionTypes<typeof actionsAuth>
