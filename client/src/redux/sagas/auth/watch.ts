import {all, takeEvery} from "redux-saga/effects";
import {authEnum} from "../../reducer/auth/actions";
import {
    workerCheckTemporaryToken,
    workerCreateNewPassword,
    workerLogout,
    workerUserAuthorization,
    workerUserAuthorizationCheck,
    workerUserConfirmEmail,
    workerUserForget,
    workerUserRegister
} from "./worker";

/**
 * authorization user
 */
export function* watchUserAuthorization() {
    yield all([
        takeEvery(authEnum.REGISTER_USER_REQUEST, workerUserRegister),
        takeEvery(authEnum.AUTH_USER_REQUEST, workerUserAuthorization),
        takeEvery(authEnum.CONFIRM_USER_REQUEST, workerUserConfirmEmail),
        takeEvery(authEnum.CHECK_AUTH_USER_REQUEST, workerUserAuthorizationCheck),
        takeEvery(authEnum.FORGET_USER_REQUEST, workerUserForget),
        takeEvery(authEnum.CHECK_TEMPORARY_TOKEN_REQUEST, workerCheckTemporaryToken),
        takeEvery(authEnum.CREATE_NEW_PASSWORD_REQUEST, workerCreateNewPassword),
        takeEvery(authEnum.LOGOUT_REQUEST, workerLogout),
    ])
}