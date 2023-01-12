import {call, putResolve, StrictEffect} from "redux-saga/effects";
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
        console.log(e)
    }
}
