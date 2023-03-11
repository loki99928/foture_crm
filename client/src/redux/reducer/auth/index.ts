import {
    ActionTypeAuth,
    InitialStateType
} from "./actions";
import {ResultStatusCodeEnum} from "../../../types/ApiUsersTypes";
import {authEnum, TInitialStateAuth} from "./types";

export let initialStateAuth = {
    isLoad: false,
    isAuth: false,
    message: undefined,
    status: undefined,
    typeRequest: undefined,
    hashUser: undefined,
    user: {
        userId: undefined,
        email: undefined,
        password: undefined,
        accessToken: undefined,
    }
} as TInitialStateAuth

const AuthReducer = (state = initialStateAuth, action: ActionTypeAuth): InitialStateType => {
    switch (action.type) {
        case authEnum.AUTH_LOAD_FORM:
            return ({
                ...state,
                status: undefined,
                message: undefined,
                user: undefined,
            })

        // регистрация пользователя
        case authEnum.REGISTER_USER_REQUEST:
            return {
                ...state,
                status: undefined,
                message: undefined,
            }
        case authEnum.REGISTER_USER_SUCCESS:
            return {
                ...state,
                status: ResultStatusCodeEnum.Success,
                message: action.payload.message,
            }
        case authEnum.REGISTER_USER_FAIL:
            return {
                ...state,
                status: ResultStatusCodeEnum.Error,
                message: action.payload.message,
            }

        // авторизация пользователя
        case authEnum.AUTH_USER_REQUEST:
            return {
                ...state,
                status: undefined,
                message: undefined,
                user: action.payload.user
            }
        case authEnum.AUTH_USER_SUCCESS:
            return {
                ...state,
                isAuth: true,
                status: undefined,
                message: undefined,
                user: action.payload.user
            }
        case authEnum.AUTH_USER_FAIL:
            return {
                ...state,
                isAuth: false,
                status: undefined,
                message: action.payload.message,
                user: undefined
            }

        // аутентификация пользователя по токену
        case authEnum.CHECK_AUTH_USER_REQUEST:
            return {
                ...state,
                status: undefined,
                message: undefined,
                user: undefined
            }
        case authEnum.CHECK_AUTH_USER_SUCCESS:
            return {
                ...state,
                isAuth: true,
                message: undefined,
                status: undefined,
                user: action.payload.user
            }
        case authEnum.CHECK_AUTH_USER_FAIL:
            return {
                ...state,
                isAuth: false,
                status: undefined,
                message: undefined,
                user: undefined
            }

        // подтверждение почты пользователя
        case authEnum.CONFIRM_USER_REQUEST:
            return {
                ...state,
                message: undefined,
                status: undefined,
                hashUser: action.payload.hashUser,
            }
        case authEnum.CONFIRM_USER_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                status: ResultStatusCodeEnum.Success,
                hashUser: undefined
            }
        case authEnum.CONFIRM_USER_FAIL:
            return {
                ...state,
                message: action.payload.message,
                status: ResultStatusCodeEnum.Error,
                hashUser: undefined
            }

        // запрос на восстановления пароля
        case authEnum.FORGET_USER_REQUEST:
            return {
                ...state,
                message: undefined,
                user: action.payload.user
            }
        case authEnum.FORGET_USER_SUCCESS:
            return {
                ...state,
                status: ResultStatusCodeEnum.Success,
                message: action.payload.message,
                user: undefined
            }
        case authEnum.FORGET_USER_FAIL:
            return {
                ...state,
                status: ResultStatusCodeEnum.Error,
                message: action.payload.message,
                user: undefined
            }

        // проверка временного токена из ссылки на восстановление пароля
        case authEnum.CHECK_TEMPORARY_TOKEN_REQUEST:
            return {
                ...state,
                message: undefined,
                status: undefined,
                hashUser: action.payload.hashUser,
            }
        case authEnum.CHECK_TEMPORARY_TOKEN_SUCCESS:
            return {
                ...state,
                message: undefined,
                status: ResultStatusCodeEnum.Success
            }
        case authEnum.CHECK_TEMPORARY_TOKEN_FAIL:
            return {
                ...state,
                message: action.payload.message,
                status: ResultStatusCodeEnum.Error,
                hashUser: undefined
            }

        // запрос на создание нового пароля
        case authEnum.CREATE_NEW_PASSWORD_REQUEST:
            return {
                ...state,
                status: undefined,
                message: undefined,
                hashUser: action.payload.hashUser,
            }
        case authEnum.CREATE_NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                status: ResultStatusCodeEnum.Success,
                message: action.payload.message,
                hashUser: undefined,
            }
        case authEnum.CREATE_NEW_PASSWORD_FAIL:
            return {
                ...state,
                status: ResultStatusCodeEnum.Error,
                message: action.payload.message,
                hashUser: undefined,
            }
        case authEnum.LOGOUT_SUCCESS:
            return {
                ...state,
                user: undefined,
                isAuth: false
            }
        default:
            return state
    }
}

export default AuthReducer;