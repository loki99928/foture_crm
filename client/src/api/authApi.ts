import axios, {AxiosError} from "axios";
import {
    IApiErrorResponse,
    IApiUserLoginData,
    IApiUserLoginResponse,
    IApiUsersChangeTokenNewPasswordResponse,
    IApiUsersCreateNewPasswordData,
    IApiUsersCreateNewPasswordResponse,
    IApiUsersForgetData, IApiUsersGetResponse,
    IApiUsersRegisterData,
    IResponseServer
} from "../types/ApiUsersTypes";

const instance = axios.create({
    baseURL: '/auth/'
});

export const authApi = {

    /**
     * регистрация пользователя
     *
     * @param data
     * @returns {*}
     */
    register(data: IApiUsersRegisterData) {
        return instance.post<IResponseServer>('register/', data)
            .then(res => {
                return {
                    status: res.status,
                    message: res.data.message,
                }
            })
            .catch((e) => {
                let res = e.response
                return {
                    status: res.status,
                    message: res.data.message[0],
                }
            })
    },

    /**
     * авторизация пользователя
     *
     * @param data
     * @returns {*}
     */
    authorize(data: IApiUserLoginData) {
        return instance.post<IApiUserLoginResponse & IApiErrorResponse>('authorize/', data)
            .then(res => {
                return {
                    status: res.status,
                    message: res.data.message,
                    userId: res.data.userId,
                    accessToken: res.data.accessToken
                }
            })
            .catch((e: AxiosError<IApiErrorResponse>): IApiUserLoginResponse => {
                return {
                    message: e.response?.data.message?.shift()
                }
            })
    },

    /**
     * Запрос на восстановление пароля
     *
     * @param data
     * @returns {*}
     */
    forget(data: IApiUsersForgetData) {
        return instance.post<IResponseServer>('forget/', data)
            .then(res => {
                return {
                    status: res.status,
                    message: res.data.message,
                }
            })
            .catch((e: AxiosError<IApiErrorResponse>): IResponseServer => {
                return {
                    message: e.response?.data.message?.shift()
                }
            })
    },

    /**
     * подтверждение почты пользователя
     *
     * @param userId
     * @returns {*}
     */
    confirmUser(userId: string) {
        return instance.get<IResponseServer>('confirm/' + userId)
            .then(res => {
                return {
                    status: res.data.status,
                    message: res.data.message
                }
            })
            .catch((e) => {
                let res = e.response
                return {
                    status: res.data.status,
                    message: res.data.message,
                }
            })
    },

    /**
     * Проверка наличия пользователя по временному token(восстановление пароля)
     *
     * @param token
     * @returns {*}
     */
    changeTokenNewPassword(token: string) {
        return instance.post<IApiUsersChangeTokenNewPasswordResponse & IApiErrorResponse>('changeTokenNewPassword/', {token: token})
            .then(res => {
                return {
                    status: res.status,
                    message: res.data.message
                }
            })
            .catch((e: AxiosError<IApiErrorResponse>): IApiUsersChangeTokenNewPasswordResponse => {
                return {
                    message: e.response?.data.message?.shift()
                }
            })
    },

    /**
     * Создание нового пароля
     *
     * @param values
     * @returns {*}
     */
    createNewPasswordApi(values: IApiUsersCreateNewPasswordData) {
        return instance.post<IApiUsersCreateNewPasswordResponse>('createNewPasswordApi/', values).then(res => {
            return {
                status: res.data.statusCode,
                message: res.data.message,
            }
        })
    }
}
