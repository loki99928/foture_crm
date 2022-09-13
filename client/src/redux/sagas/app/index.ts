import {all, spawn} from "redux-saga/effects";
import {watchInitialized} from "./watch";

export function* rootAppSaga() {
    const sagas = [
        watchInitialized,
    ]
    yield all(sagas.map(s => spawn(s)))
}