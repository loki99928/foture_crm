export enum userEnum {
    USER_UPDATE_REQUEST = 'CRM/AUTH/USER_UPDATE_REQUEST',
    USER_UPDATE_SUCCESS = 'CRM/AUTH/USER_UPDATE_SUCCESS',
    USER_UPDATE_FAIL = 'CRM/AUTH/USER_UPDATE_FAIL'
}

export type TUser = {
    userId?: number
    email?: string
    password?: string
    accessToken?: string
    avatarUrl?: string
    role?: string
    login?: string
}