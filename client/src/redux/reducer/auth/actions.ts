import {InferActionTypes} from "../../store";
import {initialStateAuth} from "./index";
import {IResponseServer} from "../../../types/ApiUsersTypes";
import {authEnum, TUser} from "./types";

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
