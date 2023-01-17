import {all, takeEvery} from "redux-saga/effects";
import {SET_INITIALIZED_REQUEST} from "../../reducer/app/actions";
import {workerInitialized} from "./worker";

/**
 * authorization user
 */
export function* watchInitialized() {
    yield all([
        takeEvery(SET_INITIALIZED_REQUEST, workerInitialized),
    ])
}