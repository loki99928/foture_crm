import {all, takeEvery} from "redux-saga/effects";
import {appEnum} from "../../reducer/app/actions";
import {workerInitialized} from "./worker";

/**
 * authorization user
 */
export function* watchInitialized() {
    yield all([
        takeEvery(appEnum.SET_INITIALIZED_REQUEST, workerInitialized),
    ])
}