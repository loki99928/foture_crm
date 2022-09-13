import {all, spawn, call} from "redux-saga/effects"
import {rootAuthSaga} from "./auth";
import {rootAppSaga} from "./app";

export function* rootSaga() {
    const sagas = [
        rootAuthSaga,
        rootAppSaga
    ]
    yield all(
        sagas.map((saga) => {
            return spawn(function* () {
                while (true) {
                    try {
                        yield call(saga)
                        break
                    } catch (e) {
                        console.log(e)
                    }
                }
            })
        })
    )
}