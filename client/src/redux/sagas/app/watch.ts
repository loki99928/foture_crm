import {all, takeEvery} from "redux-saga/effects";
import {workerInitialized} from "./worker";
import {appEnum} from "../../reducer/app/types";

/**
 * authorization user
 */
export function* watchInitialized() {
    yield all([
        takeEvery(appEnum.SET_INITIALIZED_REQUEST, workerInitialized),
    ])
}