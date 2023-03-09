import {
    ActionTypeAuth,
    AUTH_LOAD_FORM,
    AUTH_USER_FAIL,
    AUTH_USER_REQUEST,
    AUTH_USER_SUCCESS,
    CHECK_AUTH_USER_FAIL,
    CHECK_AUTH_USER_REQUEST,
    CHECK_AUTH_USER_SUCCESS,
    CHECK_TEMPORARY_TOKEN_FAIL,
    CHECK_TEMPORARY_TOKEN_REQUEST,
    CHECK_TEMPORARY_TOKEN_SUCCESS,
    CONFIRM_USER_FAIL,
    CONFIRM_USER_REQUEST,
    CONFIRM_USER_SUCCESS,
    CREATE_NEW_PASSWORD_FAIL,
    CREATE_NEW_PASSWORD_REQUEST,
    CREATE_NEW_PASSWORD_SUCCESS,
    FORGET_USER_FAIL,
    FORGET_USER_REQUEST,
    FORGET_USER_SUCCESS,
    InitialStateType,
    LOGOUT_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from "./actions";
import {ResultStatusCodeEnum} from "../../../types/ApiUsersTypes";

export type TUser = {
    userId?:  number
    email?: string
    password?: string
    accessToken?: string
    avatarUrl?: string
    role?: string
    login?: string
}

export type TInitialStateAuth = {
    isLoad?: boolean
    isAuth?: boolean
    message?: string
    status?: number
    typeRequest?: string
    hashUser?: string
    user?: TUser
}

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
        case AUTH_LOAD_FORM:
            return ({
                ...state,
                status: undefined,
                message: undefined,
                user: undefined,
            })

        // регистрация пользователя
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                status: undefined,
                message: undefined,
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                status: ResultStatusCodeEnum.Success,
                message: action.payload.message,
            }
        case REGISTER_USER_FAIL:
            return {
                ...state,
                status: ResultStatusCodeEnum.Error,
                message: action.payload.message,
            }

        // авторизация пользователя
        case AUTH_USER_REQUEST:
            return {
                ...state,
                status: undefined,
                message: undefined,
                user: action.payload.user
            }
        case AUTH_USER_SUCCESS:
            return {
                ...state,
                isAuth: true,
                status: undefined,
                message: undefined,
                user: action.payload.user
            }
        case AUTH_USER_FAIL:
            return {
                ...state,
                isAuth: false,
                status: undefined,
                message: action.payload.message,
                user: undefined
            }

        // аутентификация пользователя по токену
        case CHECK_AUTH_USER_REQUEST:
            return {
                ...state,
                status: undefined,
                message: undefined,
                user: undefined
            }
        case CHECK_AUTH_USER_SUCCESS:
            return {
                ...state,
                isAuth: true,
                message: undefined,
                status: undefined,
                user: action.payload.user
            }
        case CHECK_AUTH_USER_FAIL:
            return {
                ...state,
                isAuth: false,
                status: undefined,
                message: undefined,
                user: undefined
            }

        // подтверждение почты пользователя
        case CONFIRM_USER_REQUEST:
            return {
                ...state,
                message: undefined,
                status: undefined,
                hashUser: action.payload.hashUser,
            }
        case CONFIRM_USER_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                status: ResultStatusCodeEnum.Success,
                hashUser: undefined
            }
        case CONFIRM_USER_FAIL:
            return {
                ...state,
                message: action.payload.message,
                status: ResultStatusCodeEnum.Error,
                hashUser: undefined
            }

        // запрос на восстановления пароля
        case FORGET_USER_REQUEST:
            return {
                ...state,
                message: undefined,
                user: action.payload.user
            }
        case FORGET_USER_SUCCESS:
            return {
                ...state,
                status: ResultStatusCodeEnum.Success,
                message: action.payload.message,
                user: undefined
            }
        case FORGET_USER_FAIL:
            return {
                ...state,
                status: ResultStatusCodeEnum.Error,
                message: action.payload.message,
                user: undefined
            }

        // проверка временного токена из ссылки на восстановление пароля
        case CHECK_TEMPORARY_TOKEN_REQUEST:
            return {
                ...state,
                message: undefined,
                status: undefined,
                hashUser: action.payload.hashUser,
            }
        case CHECK_TEMPORARY_TOKEN_SUCCESS:
            return {
                ...state,
                message: undefined,
                status: ResultStatusCodeEnum.Success
            }
        case CHECK_TEMPORARY_TOKEN_FAIL:
            return {
                ...state,
                message: action.payload.message,
                status: ResultStatusCodeEnum.Error,
                hashUser: undefined
            }

            // запрос на создание нового пароля
        case CREATE_NEW_PASSWORD_REQUEST:
            return {
                ...state,
                status: undefined,
                message: undefined,
                hashUser: action.payload.hashUser,
            }
        case CREATE_NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                status: ResultStatusCodeEnum.Success,
                message: action.payload.message,
                hashUser: undefined,
            }
        case CREATE_NEW_PASSWORD_FAIL:
            return {
                ...state,
                status: ResultStatusCodeEnum.Error,
                message: action.payload.message,
                hashUser: undefined,
            }
        case LOGOUT_SUCCESS:
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