export enum ResultStatusCodeEnum {
    Success = 200,
    Created = 201,
    Error = 400,
    FORBIDDEN = 403
}

export interface IResponseServer {
    status: ResultStatusCodeEnum
    message: string
}


// RegisterUserApi
export interface IApiUsersRegisterData {
    email: string
    password: string
}

// AuthUserApi
export interface IApiUserLoginData {
    email: string
    password: string
    remember: boolean
    mainError: any
}
export interface IApiUserLoginResponse extends IResponseServer{
    accessToken?: string
}

// Forget
export interface IApiUsersForgetData {
    email: string
}

// createNewPasswordApi
export interface IApiUsersCreateNewPasswordData {
    password: string
    double_password: string
    token: string | undefined
}
export interface IApiUsersCreateNewPasswordResponse {
    statusCode: ResultStatusCodeEnum
    message: string
}

// changeTokenNewPassword
export interface IApiUsersChangeTokenNewPasswordResponse {
    statusCode: ResultStatusCodeEnum
    errors: {[key: string]: string}
    email: string
}

// get
export interface IApiUsersGetResponse {
    userId: string | null
    email: string
    errors: {[key: string]: string}
}
