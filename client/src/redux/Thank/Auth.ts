import Cookies from "js-cookie";

import {usersApi} from "../../api/apiUsers";
import {
    IApiUserLoginData,
    IApiUsersCreateNewPasswordData,
    IApiUsersForgetData,
    IApiUsersRegisterData
} from "../../types/ApiUsersTypes";
import {setCookieJWT} from "../../helpers/Tokens";
import {actions, ActionTypeAuth} from "../Actions/Auth";
import {BaseThunkType} from "../store";

/**
 * регистрация пользователя
 *
 * @param data
 * @returns {(function(*): Array)|*}
 */
export const RegisterUserApi = (data: IApiUsersRegisterData): ThunkType => async () => {
    return await usersApi.register(data)
}
/**
 * подтверждение почты пользователя
 *
 * @param userId
 * @returns {(function(*): Array)|*}
 */
export const ConfirmUserApi = (userId: string): ThunkType => async (dispatch) => {
    let result = await usersApi.confirmUser(userId)
    dispatch(actions.toggleIsLoad())
    return result
}
/**
 * авторизация пользователя
 *
 * @param data
 * @returns {(function(*): Array)|*}
 */
export const AuthUserApi = (data: IApiUserLoginData): ThunkType => async (dispatch) => {
    let result = await usersApi.authorize(data)
    if (result.accessToken !== undefined) {
        setCookieJWT(result.accessToken, data.remember)
        // dispatch(actions.setUserData(result.usersId, result.email))
        dispatch(actions.toggleIsAuth(true))
    }
    return result
}
/**
 * восстановление пароля пользователя
 *
 * @param data
 * @returns {(function(*): Array)|*}
 */
export const ForgetUserApi = (data: IApiUsersForgetData): ThunkType => async () => {
    return await usersApi.forget(data)
}
/**
 * получение данных пользователя по токену
 *
 * @returns {(function(*): Array)|*}
 */
export const getUser = (): ThunkType => async (dispatch) => {
    const token = Cookies.get('token')
    if (token) {
        let result = await usersApi.get(token)
        let {userId, email} = result
        dispatch(actions.setUserData(userId, email))
        dispatch(actions.toggleIsAuth(true))
    }
}
export const validatePasswordToken = (token: string | undefined): ThunkType => async (dispatch) => {
    if (token === undefined) return;
    let result = await usersApi.changeTokenNewPassword(token)
    dispatch(actions.toggleIsLoad())
    return result
}
/**
 * Создание нового пароля
 *
 * @param values
 * @returns {(function(*): Array)|*}
 */
export const CreatingNewPasswordApi = (values: IApiUsersCreateNewPasswordData): ThunkType => async () => {
    return usersApi.createNewPasswordApi(values)
}
/**
 * logout user
 *
 * @param data
 * @returns {(function(*): void)|*}
 */
// export const LogOutUserApi = (data: any): ThunkType => (dispatch) => {
//     // todo-dv нужно реализовать функционал раз логирования
// }
type ThunkType = BaseThunkType<ActionTypeAuth>