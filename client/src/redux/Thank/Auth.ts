import Cookies from "js-cookie";

import {authApi} from "../../api/authApi";
import {
    IApiUserLoginData,
    IApiUsersCreateNewPasswordData,
    IApiUsersForgetData,
    IApiUsersRegisterData
} from "../../types/ApiUsersTypes";
import {setCookieJWT} from "../../helpers/Tokens";
import {actions, ActionTypeAuth} from "../Actions/Auth";
import {BaseThunkType} from "../store";
import {userApi} from "../../api/userApi";

/**
 * регистрация пользователя
 *
 * @param data
 * @returns {(function(*): Array)|*}
 */
export const RegisterUserApi = (data: IApiUsersRegisterData): ThunkType => async () => {
    return await authApi.register(data)
}
/**
 * подтверждение почты пользователя
 *
 * @param userId
 * @returns {(function(*): Array)|*}
 */
export const ConfirmUserApi = (userId: string): ThunkType => async (dispatch) => {
    let result = await authApi.confirmUser(userId)
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
    let result = await authApi.authorize(data)
    if (result.accessToken !== undefined) {
        setCookieJWT(result.accessToken, data.remember)
        dispatch(actions.setUserData(result.userId, data.email))
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
    return await authApi.forget(data)
}
/**
 * получение данных пользователя по token
 *
 * @returns {(function(*): Array)|*}
 */
export const getUser = (): ThunkType => async (dispatch) => {
    const token = Cookies.get('token')
    if (token) {
        let result = await userApi.get(token)
        if (result && result.accessToken){
            setCookieJWT(result.accessToken, true)
            dispatch(actions.setUserData(result.userId, result.email))
            dispatch(actions.toggleIsAuth(true))
        } else {
            dispatch(actions.toggleIsAuth(false))
        }
    }
}
export const validatePasswordToken = (token: string | undefined): ThunkType => async (dispatch) => {
    if (token === undefined) return;
    let result = await authApi.changeTokenNewPassword(token)
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
    return authApi.createNewPasswordApi(values)
}
/**
 * logout user
 *
 * @param data
 * @returns {(function(*): void)|*}
 */
// export const LogOutUserApi = (data: any): ThunkType => (dispatch) => {
//     // todo-dv нужно реализовать функционал разлогирования
// }
type ThunkType = BaseThunkType<ActionTypeAuth>