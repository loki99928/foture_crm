import {takeEvery, all} from "redux-saga/effects";
import {
    AUTH_USER_REQUEST,
    CHECK_AUTH_USER_REQUEST,
    CONFIRM_USER_REQUEST, FORGET_USER_REQUEST,
    REGISTER_USER_REQUEST
} from "../../reducer/auth/actions";
import {
    workerUserAuthorization,
    workerUserAuthorizationCheck,
    workerUserConfirm,
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
        takeEvery(CHECK_AUTH_USER_REQUEST, workerUserAuthorizationCheck),
        takeEvery(CONFIRM_USER_REQUEST, workerUserConfirm),
        takeEvery(FORGET_USER_REQUEST, workerUserForget),
    ])
}