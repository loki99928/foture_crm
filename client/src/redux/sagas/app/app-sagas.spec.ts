import {testSaga} from 'redux-saga-test-plan';
import {actionsApp, appEnum} from "../../reducer/app/actions";
import {workerInitialized} from "./worker";
import {workerUserAuthorizationCheck} from "../auth/worker";

describe('Sagas app', () => {

    describe('workerInitialized', function () {
        const action = {
            type: appEnum.SET_INITIALIZED_REQUEST,
            payload: {
                user: {
                    email: 'test@mail.ru',
                    password: '1314@tvwD'
                }
            }
        }
        it('success', () => {
            testSaga(workerInitialized)
                .next()
                .call(workerUserAuthorizationCheck)
                .next()
                .putResolve(actionsApp.initializedSuccess())
                .next()
                .isDone()
        });

    });

})