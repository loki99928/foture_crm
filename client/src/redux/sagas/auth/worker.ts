import {call, put, putResolve, StrictEffect} from "redux-saga/effects";
import {actionsAuth} from "../../reducer/auth/actions";
import {authApi} from "../../../api/authApi";
import {
    IApiUserLoginData,
    IApiUserLoginResponse,
    IApiUsersForgetData,
    IApiUsersRegisterData
} from "../../../types/ApiUsersTypes";
import {setCookieJWT} from "../../../helpers/Tokens";

import Cookies from "js-cookie";
import {userApi} from "../../../api/userApi";


/**
 * регистрация пользователя
 */
type TRegisterUser = {
    type: string,
    payload: {
        user: IApiUsersRegisterData
    }
}
export function* workerUserRegister({payload}: TRegisterUser): Generator<StrictEffect, void, any> {
    try {
        const result = yield call(authApi.register, payload.user)
        yield put(actionsAuth.registerUserSuccess({message : result.message.shift()}))
    } catch (err: any) {
        yield put(actionsAuth.registerUserFail({message : err.message}))
    }
}

/**
 * авторизация пользователя
 *
 * @param payload
 */
type TAuthorizationUser = {
    type: string,
    payload: {
        user: IApiUserLoginData
    }
}
export function* workerUserAuthorization({payload}: TAuthorizationUser): Generator<StrictEffect, void, IApiUserLoginResponse> {
    try {
        const user = payload.user as IApiUserLoginData
        const result = yield call(authApi.authorize, user);
        if (result.accessToken !== undefined) {
            setCookieJWT(result.accessToken, user.remember)
            let data = {
                userId: result.userId,
                accessToken: result.accessToken
            }
            yield put(actionsAuth.authUserSuccess(data))
        } else {
            throw new Error('token is not validation')
        }
    } catch (err: any) {
        yield put(actionsAuth.authUserFail({message : err.message}))
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
        setCookieJWT(result.accessToken, result.remember)
        yield putResolve(actionsAuth.authUserDataSuccess(result))
    } catch (err: any) {
        yield put(actionsAuth.authUserDataFail())
    }
}

/**
 * подтверждение почты пользователя
 */
type TConfirmUser = {
    type: string,
    payload: {
        hashUser: string
    }
}
export function* workerUserConfirmEmail(action: TConfirmUser): Generator<StrictEffect, void, any> {
    const hashUser = action.payload.hashUser
    try {
        const result = yield call(authApi.confirmUser, hashUser)
        yield put(actionsAuth.confirmUserSuccess({message : result.message.shift()}))
    } catch (err:any) {
        yield put(actionsAuth.confirmUserFail({message : err.message}))
    }
}

/**
 * запрос на восстановление пароля
 */
type TForgetUser = {
    type: string,
    payload: {
        user: IApiUsersForgetData
    }
}
export function* workerUserForget(action: TForgetUser): Generator<StrictEffect, void, any> {
    const email = action.payload.user.email
    try {
        const result = yield call(authApi.forget, {email})
        yield put(actionsAuth.confirmUserSuccess({message : result.message.shift()}))
    } catch (err: any) {
        yield put(actionsAuth.confirmUserFail({message : err.message}))
    }
}


/**
 * проверка временного токена из ссылки на восстановление пароля
 */
type TTemporaryToken = {
    type: string,
    payload: {
        hashUser: string
    }
}
export function* workerCheckTemporaryToken(action: TTemporaryToken): Generator<StrictEffect, void, any> {
    const hashUser = action.payload.hashUser
    try {
        const result = yield call(authApi.changeTokenNewPassword, hashUser)
        console.log(result)
        // yield put(actionsAuth.checkTemporaryTokenSuccess({message : result.message.shift()}))
    } catch (err: any) {
        yield put(actionsAuth.checkTemporaryTokenFail({message : err.message}))
    }
}

/**
 * сохранение нового пароля
 */
export function* workerCreateNewPassword(action: any): Generator<StrictEffect, void, any>{
    console.log(action)
    try {
        const result = yield call(authApi.createNewPasswordApi, action.payload)
        console.log(result)
        yield put(actionsAuth.createNewPasswordSuccess({message : result.message.shift()}))
    } catch (err: any) {
        yield put(actionsAuth.createNewPasswordFail({message : err.message}))
    }
}