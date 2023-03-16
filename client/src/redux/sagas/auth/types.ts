import {IApiUserLoginData, IApiUsersForgetData, IApiUsersRegisterData} from "../../../types/ApiUsersTypes";

export type TRegisterUser = {
    type: string,
    payload: {
        user: IApiUsersRegisterData
    }
}
export type TAuthorizationUser = {
    type: string,
    payload: {
        user: IApiUserLoginData
    }
}

export type TConfirmUser = {
    type: string,
    payload: {
        hashUser: string
    }
}

export type TForgetUser = {
    type: string,
    payload: {
        user: IApiUsersForgetData
    }
}

export type TTemporaryToken = {
    type: string,
    payload: {
        hashUser: string
    }
}

export type TCreateNewPassword = {
    type: string,
    payload: {
        password: string
        double_password: string
        hashUser: string
    }
}