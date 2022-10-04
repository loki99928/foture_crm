import {takeEvery, all} from "redux-saga/effects";
import {
    AUTH_USER_REQUEST,
    CHECK_AUTH_USER_REQUEST, CHECK_TEMPORARY_TOKEN_REQUEST,
    CONFIRM_USER_REQUEST, CREATE_NEW_PASSWORD_REQUEST, FORGET_USER_REQUEST,
    REGISTER_USER_REQUEST
} from "../../reducer/auth/actions";
import {
    workerCheckTemporaryToken, workerCreateNewPassword,
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
        takeEvery(REGISTER_USER_REQUEST, workerUserRegister),
        takeEvery(AUTH_USER_REQUEST, workerUserAuthorization),
        takeEvery(CONFIRM_USER_REQUEST, workerUserConfirmEmail),
        takeEvery(CHECK_AUTH_USER_REQUEST, workerUserAuthorizationCheck),
        takeEvery(FORGET_USER_REQUEST, workerUserForget),
        takeEvery(CHECK_TEMPORARY_TOKEN_REQUEST, workerCheckTemporaryToken),
        takeEvery(CREATE_NEW_PASSWORD_REQUEST, workerCreateNewPassword),
    ])
}