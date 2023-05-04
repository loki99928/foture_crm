import {TUser} from "../user/types";

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

export type TInitialStateAuth = {
    isLoad?: boolean
    isAuth?: boolean
    message?: string
    status?: number
    typeRequest?: string
    hashUser?: string
    user?: TUser
}