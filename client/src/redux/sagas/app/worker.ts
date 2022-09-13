import {put, StrictEffect, take, actionChannel, putResolve, call} from "redux-saga/effects";
import {actionsAuth, CHECK_AUTH_USER_REQUEST} from "../../reducer/auth/actions";
import {workerUserAuthorizationCheck} from "../auth/worker";
import {actionsApp} from "../../reducer/app/actions";

/**
 * Инициализация приложения
 */
export function* workerInitialized(): Generator<StrictEffect, void, any> {
    try {
        yield call(workerUserAuthorizationCheck)
        yield putResolve(actionsApp.initializedSuccess())
    } catch (e) {

    }
}
