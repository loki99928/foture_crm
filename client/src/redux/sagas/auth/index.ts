import {all, spawn} from "redux-saga/effects";
import {watchUserAuthorization} from "./watch";

export function* rootAuthSaga() {
    const sagas = [
        watchUserAuthorization,
    ]
    yield all(sagas.map(s => spawn(s)))
}