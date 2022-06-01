import axios from "axios";
import {
    IApiUserLoginData,
    IApiUserLoginResponse,
    IApiUsersChangeTokenNewPasswordResponse,
    IApiUsersCreateNewPasswordData,
    IApiUsersCreateNewPasswordResponse,
    IApiUsersForgetData,
    IApiUsersGetResponse,
    IApiUsersRegisterData,
    IResponseServer
} from "../types/ApiUsersTypes";

const instance = axios.create({
    baseURL: '/auth/'
});

export const usersApi = {

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
        return instance.post<IApiUserLoginResponse>('authorize/', data)
            .then(res => {
                return {
                    status: res.status,
                    message: res.data.message,
                    accessToken: res.data.accessToken
                }
            })
            .catch((e) => {
                let res = e.response
                return {
                    status: res.status,
                    message: res.data.message[0],
                    accessToken: undefined,
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
        return instance.post<IResponseServer>('forget/', data).then(res => {
            return {
                status: res.data.status,
                message: res.data.message,
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
     * проверка авторизации пользователя по токену
     *
     * @param token
     * @returns {*}
     */
    get(token: string) {
        return instance.get<IApiUsersGetResponse>(
            'login/',
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            }
        ).then(res => {
            return {
                userId: res.data.userId,
                errors: res.data.errors,
                email: res.data.email,
            }
        })
    },

    /**
     * Проверка наличия пользователя по временному токену(восстановление пароля)
     *
     * @param token
     * @returns {*}
     */
    changeTokenNewPassword(token: string) {
        return instance.post<IApiUsersChangeTokenNewPasswordResponse>('changeTokenNewPassword/', {token: token}).then(res => {
            return {
                status: res.data.statusCode,
                errors: res.data.errors,
                email: res.data.email,
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
