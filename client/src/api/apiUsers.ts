import axios from "axios";
import {
    IApiUserLoginData,
    IApiUserLoginResponse,
    IApiUsersForgetData,
    IApiUsersRegisterData,
    IResponseServer,
    IApiUsersChangeTokenNewPasswordResponse,
    IApiUsersCreateNewPasswordData,
    IApiUsersCreateNewPasswordResponse,
    IApiUsersGetResponse
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
                console.log(res)
                return {
                    status: res.data.status,
                    error: res.data.error,
                }
            })
            .catch((e) => {
                let res = e.response
                console.log(res)
                return {
                    status: res.data.status,
                    error: res.data.message[0],
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
        return instance.post<IApiUserLoginResponse>('authorize/', data).then(res => {
            console.log(res)
            return {
                status: res.data.status,
                error: res.data.error,
                email: res.data.email,
                usersId: res.data.usersId,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
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
                errors: res.data.error,
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
        return instance.get<IResponseServer>('confirm/'+userId).then(res => {
            console.log(res)
            return {
                status: res.data.status,
                errors: res.data.error
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
