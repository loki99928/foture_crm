import {call, put, putResolve, StrictEffect} from "redux-saga/effects";
import {actionsAuth} from "../../reducer/auth/actions";
import {authApi} from "../../../api/authApi";
import {IApiUserLoginData, IApiUserLoginResponse} from "../../../types/ApiUsersTypes";
import {setCookieJWT} from "../../../helpers/Tokens";

import Cookies from "js-cookie";
import {userApi} from "../../../api/userApi";
import {
    TAuthorizationUser,
    TConfirmUser,
    TCreateNewPassword,
    TForgetUser,
    TRegisterUser,
    TTemporaryToken
} from "./types";


/**
 * регистрация пользователя
 */
export function* workerUserRegister({payload}: TRegisterUser): Generator<StrictEffect, void, any> {
    try {
        const result = yield call(authApi.register, payload.user)
        yield put(actionsAuth.registerUserSuccess({message: result.message.shift()}))
    } catch (err: any) {
        const message = err.message || 'Internal Server Error'
        yield put(actionsAuth.registerUserFail({message}))
    }
}

/**
 * авторизация пользователя
 *
 * @param payload
 */
export function* workerUserAuthorization({payload}: TAuthorizationUser): Generator<StrictEffect, void, IApiUserLoginResponse> {
    try {
        const user = payload.user as IApiUserLoginData
        const result = yield call(authApi.authorize, user);
        if (result.accessToken !== undefined) {
            setCookieJWT(result.accessToken, false)
            let data = {
                userId: result.userId,
                accessToken: result.accessToken
            }
            yield put(actionsAuth.authUserSuccess(data))
        } else {
            new Error('token is not validation')
        }
    } catch (err: any) {
        const message = err.message || 'Internal Server Error'
        yield put(actionsAuth.authUserFail({message}))
    }
}

/**
 * авторизация пользователя по токену
 */
export function* workerUserAuthorizationCheck(): Generator<StrictEffect, void, any> {
    const token = Cookies.get('token')
    if (!token) {
        yield put(actionsAuth.authUserDataFail())
        return
    }
    try {
        const result = yield call(userApi.get, token)
        setCookieJWT(result.accessToken, false)
        yield putResolve(actionsAuth.authUserDataSuccess(result))
    } catch (err: any) {
        yield put(actionsAuth.authUserDataFail())
    }
}

/**
 * подтверждение почты пользователя
 */
export function* workerUserConfirmEmail(action: TConfirmUser): Generator<StrictEffect, void, any> {
    const hashUser = action.payload.hashUser
    try {
        const result = yield call(authApi.confirmUser, hashUser)
        yield put(actionsAuth.confirmUserSuccess({message: result.message.shift()}))
    } catch (err: any) {
        const message = err.message || 'Internal Server Error'
        yield put(actionsAuth.confirmUserFail({message}))
    }
}

/**
 * запрос на восстановление пароля
 */
export function* workerUserForget(action: TForgetUser): Generator<StrictEffect, void, any> {
    const email = action.payload.user.email
    try {
        const result = yield call(authApi.forget, {email})
        yield put(actionsAuth.forgetUserSuccess({message: result.message.shift()}))
    } catch (err: any) {
        const message = err.message || 'Internal Server Error'
        yield put(actionsAuth.forgetUserFail({message}))
    }
}


/**
 * проверка временного токена из ссылки на восстановление пароля
 */
export function* workerCheckTemporaryToken(action: TTemporaryToken): Generator<StrictEffect, void, any> {
    const hashUser = action.payload.hashUser
    try {
        const result = yield call(authApi.changeTokenNewPassword, hashUser)
        yield put(actionsAuth.checkTemporaryTokenSuccess({message: result.message.shift()}))
    } catch (err: any) {
        yield put(actionsAuth.checkTemporaryTokenFail({message: err.message}))
    }
}

/**
 * сохранение нового пароля
 */
export function* workerCreateNewPassword(action: TCreateNewPassword): Generator<StrictEffect, void, any> {
    try {
        const result = yield call(authApi.createNewPasswordApi, action.payload)
        yield put(actionsAuth.createNewPasswordSuccess({message: result.message.shift()}))
    } catch (err: any) {
        const message = err.message || 'Internal Server Error'
        yield put(actionsAuth.createNewPasswordFail({message}))
    }
}

/**
 * logout user
 */
export function* workerLogout() {
    Cookies.set('token', '', {expires: 0});
    yield put(actionsAuth.logoutSuccess())
}