import {
    ActionTypeAuth,
    AUTH_LOAD_FORM,
    AUTH_USER_FAIL,
    AUTH_USER_REQUEST,
    AUTH_USER_SUCCESS,
    CHECK_AUTH_USER_FAIL,
    CHECK_AUTH_USER_REQUEST,
    CHECK_AUTH_USER_SUCCESS, CHECK_TEMPORARY_TOKEN_FAIL, CHECK_TEMPORARY_TOKEN_REQUEST, CHECK_TEMPORARY_TOKEN_SUCCESS,
    CONFIRM_USER_FAIL,
    CONFIRM_USER_REQUEST,
    CONFIRM_USER_SUCCESS,
    FORGET_USER_FAIL,
    FORGET_USER_REQUEST,
    FORGET_USER_SUCCESS,
    InitialStateType,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from "./actions";
import {ResultStatusCodeEnum} from "../../../types/ApiUsersTypes";

export type TUser = {
    userId?:  number
    email?: string
    password?: string
    remember?: boolean
    accessToken?: string
}

export type TInitialStateAuth = {
    isLoad?: boolean
    isAuth?: boolean
    message?: string
    status?: number
    typeRequest?: string
    hashUser?: string
    temporaryToken?: string
    user?: TUser
}

export let initialStateAuth = {
    isLoad: false,
    isAuth: false,
    message: undefined,
    status: undefined,
    typeRequest: undefined,
    hashUser: undefined,
    temporaryToken: undefined,
    user: {
        userId: undefined,
        email: undefined,
        password: undefined,
        remember: undefined,
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
                message: action.payload.message,
                user: undefined
            }
        case FORGET_USER_FAIL:
            return {
                ...state,
                message: action.payload.message,
                user: undefined
            }

        // проверка временного токена из ссылки на восстановление пароля
        case CHECK_TEMPORARY_TOKEN_REQUEST:
            return {
                ...state,
                message: undefined,
                status: undefined,
                temporaryToken: action.payload.temporaryToken,
            }
        case CHECK_TEMPORARY_TOKEN_SUCCESS:
            return {
                ...state,
                message: undefined,
                status: ResultStatusCodeEnum.Success,
                temporaryToken: undefined
            }
        case CHECK_TEMPORARY_TOKEN_FAIL:
            return {
                ...state,
                message: action.payload.message,
                status: ResultStatusCodeEnum.Error,
                temporaryToken: undefined
            }

        default:
            return state
    }
}

export default AuthReducer;