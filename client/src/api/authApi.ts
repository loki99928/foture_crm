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
                throw new Error(e.response?.data.message?.shift())
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
                console.log(res)
                return {
                    userId: res.data.userId,
                    accessToken: res.data.accessToken
                }
            })
            .catch((e: AxiosError<IApiErrorResponse>) => {
                throw new Error(e.response?.data.message?.shift())
            })
    },

    /**
     * подтверждение почты пользователя
     *
     * @param hashUser
     * @returns {*}
     */
    confirmUser(hashUser?: string) {
        return instance.get<IResponseServer>('confirm/' + hashUser)
            .then(res => {
                return {
                    status: res.data.status,
                    message: res.data.message
                }
            })
            .catch((e: AxiosError<IApiErrorResponse>) => {
                throw new Error(e.response?.data.message?.shift())
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
            .catch((e: AxiosError<IApiErrorResponse>) => {
                throw new Error(e.response?.data.message?.shift())
            })
    },

    /**
     * Проверка наличия пользователя по временному token(восстановление пароля)
     *
     * @param token
     * @returns {*}
     */
    changeTokenNewPassword(hashUser: string) {
        return instance.get<IApiUsersChangeTokenNewPasswordResponse & IApiErrorResponse>('changeTokenNewPassword/' + hashUser)
            .then(res => {
                return {
                    status: res.status,
                    message: res.data.message
                }
            })
            .catch((e: AxiosError<IApiErrorResponse>) => {
                throw new Error(e.response?.data.message?.shift())
            })
    },

    /**
     * Создание нового пароля
     *
     * @param values
     * @returns {*}
     */
    createNewPasswordApi(values: IApiUsersCreateNewPasswordData) {
        return instance.post<IApiUsersCreateNewPasswordResponse>('createNewPassword/', values)
            .then(res => {
                return {
                    status: res.status,
                    message: res.data.message
                }
            })
            .catch((e: AxiosError<IApiErrorResponse>) => {
                throw new Error(e.response?.data.message?.shift())
            })
    }
}
