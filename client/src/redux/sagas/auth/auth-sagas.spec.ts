import {expectSaga, testSaga} from 'redux-saga-test-plan';
import Cookies from "js-cookie";
import {
    workerCheckTemporaryToken,
    workerCreateNewPassword,
    workerUserAuthorization,
    workerUserAuthorizationCheck,
    workerUserConfirmEmail,
    workerUserForget,
    workerUserRegister
} from "./worker";
import {authApi} from "../../../api/authApi";
import {
    actionsAuth,
    AUTH_USER_REQUEST,
    CHECK_TEMPORARY_TOKEN_REQUEST,
    CONFIRM_USER_REQUEST,
    CREATE_NEW_PASSWORD_REQUEST,
    FORGET_USER_REQUEST,
    REGISTER_USER_REQUEST
} from "../../reducer/auth/actions";
import {userApi} from "../../../api/userApi";
import {call} from "redux-saga/effects";

describe('Sagas auth', () => {

    describe('workerUserRegister', function () {
        const action = {
            type: REGISTER_USER_REQUEST,
            payload: {
                user: {
                    email: 'test@mail.ru',
                    password: '1314@tvwD'
                }
            }
        }

        it('success', () => {
            const fakeUser = {
                email: 'test@mail.ru',
                password: '1314@tvwD'
            }
            let result = {
                message: ['Success register']
            }
            testSaga(workerUserRegister, action)
                .next()
                .call(authApi.register, fakeUser)
                .next(result)
                .put(actionsAuth.registerUserSuccess({message: 'Success register'}))
                .next()
                .isDone()
        });

        const fakeUser = {
            email: 'test@mail.ru',
            password: '1314@tvwD'
        }
        it('fail', () => {
            const error = new Error('Email busy');
            testSaga(workerUserRegister, action)
                .next()
                .call(authApi.register, fakeUser)
                .throw(error)
                .put(actionsAuth.registerUserFail({message: error.message}))
                .next()
                .isDone()

        });
    });

    describe('workerUserAuthorization', function () {
        const action = {
            type: AUTH_USER_REQUEST,
            payload: {
                user: {
                    email: 'test@mail.ru',
                    password: '1314@tvwD',
                    remember: false,
                    mainError: undefined
                }
            }
        }
        it('success', () => {
            let result = {
                userId: 1,
                accessToken: 'qwe1413er'
            }
            testSaga(workerUserAuthorization, action)
                .next()
                .call(authApi.authorize, action.payload.user)
                .next(result)
                .put(actionsAuth.authUserSuccess(result))
                .next()
                .isDone()
        });
        it('fail', () => {
            const error = new Error('Email or password is incorrect');
            testSaga(workerUserAuthorization, action)
                .next()
                .call(authApi.authorize, action.payload.user)
                .throw(error)
                .put(actionsAuth.authUserFail({message: error.message}))
                .next()
                .isDone()

        });
    });

    describe('workerUserAuthorizationCheck', function () {

        it('token is undefined', () => {
            const token = Cookies.get('token')
            if (!token) {
                testSaga(workerUserAuthorizationCheck)
                    .next()
                    .put(actionsAuth.authUserDataFail())
                    .next()
                    .isDone()
            }
        });

        it('success', () => {
            const tokenFake = 'test98344y504ev'
            Cookies.set('token', tokenFake, {path: '/', sameSite: 'Strict', expires: 1});
            let result = {
                userId: 1,
                accessToken: tokenFake
            }
            testSaga(workerUserAuthorizationCheck)
                .next()
                .call(userApi.get, tokenFake)
                .next(result)
                .putResolve(actionsAuth.authUserDataSuccess(result))
                .next()
                .isDone()
        });

        it('fail', () => {
            const tokenFake = 'test98344y504ev'
            Cookies.set('token', tokenFake, {path: '/', sameSite: 'Strict', expires: 1});
            const error = new Error('User is not find');
            testSaga(workerUserAuthorizationCheck)
                .next()
                .call(userApi.get, tokenFake)
                .throw(error)
                .put(actionsAuth.authUserDataFail())
                .next()
                .isDone()
        });
    });

    describe('workerUserConfirmEmail', function () {
        const action = {
            type: CONFIRM_USER_REQUEST,
            payload: {
                hashUser: 'test3353463463'
            }
        }

        it('success', () => {
            const hashUser = action.payload.hashUser
            let result = {
                status: 200,
                message: ['Your email has been verified']
            }
            testSaga(workerUserConfirmEmail, action)
                .next()
                .call(authApi.confirmUser, hashUser)
                .next(result)
                .put(actionsAuth.confirmUserSuccess({message: 'Your email has been verified'}))
                .next()
                .isDone()
        });

        it('fail', () => {
            const hashUser = action.payload.hashUser
            const error = new Error('User is not find');
            testSaga(workerUserConfirmEmail, action)
                .next()
                .call(authApi.confirmUser, hashUser)
                .throw(error)
                .put(actionsAuth.confirmUserFail({message: error.message}))
                .next()
                .isDone()
        });
    });

    describe('workerUserForget', function () {

        const action = {
            type: FORGET_USER_REQUEST,
            payload: {
                user: {
                    email: 'test@mail.ru'
                }
            }
        }

        it('success', () => {
            const email = action.payload.user.email
            let result = {
                status: 200,
                message: ['Message sent to your email']
            }
            testSaga(workerUserForget, action)
                .next()
                .call(authApi.forget, {email})
                .next(result)
                .put(actionsAuth.forgetUserSuccess({message: 'Message sent to your email'}))
                .next()
                .isDone()
        });

        it('fail', () => {
            const email = action.payload.user.email
            const error = new Error('The number of password recovery attempts has been exceeded. try again in 12 minutes');
            testSaga(workerUserForget, action)
                .next()
                .call(authApi.forget, {email})
                .throw(error)
                .put(actionsAuth.forgetUserFail({message: error.message}))
                .next()
                .isDone()
        });
    });

    describe('workerCheckTemporaryToken', function () {

        const action = {
            type: CHECK_TEMPORARY_TOKEN_REQUEST,
            payload: {
                hashUser: 'test3353463463'
            }
        }

        it('success', () => {
            const hashUser = action.payload.hashUser
            let result = {
                status: 200,
                message: ['Token is valid']
            }
            testSaga(workerCheckTemporaryToken, action)
                .next()
                .call(authApi.changeTokenNewPassword, hashUser)
                .next(result)
                .put(actionsAuth.checkTemporaryTokenSuccess({message: 'Token is valid'}))
                .next()
                .isDone()
        });

        it('fail', () => {
            const hashUser = action.payload.hashUser
            const error = new Error('Token expired');
            testSaga(workerCheckTemporaryToken, action)
                .next()
                .call(authApi.changeTokenNewPassword, hashUser)
                .throw(error)
                .put(actionsAuth.checkTemporaryTokenFail({message: error.message}))
                .next()
                .isDone()
        });
    });

    describe('workerCreateNewPassword', function () {

        const action = {
            type: CREATE_NEW_PASSWORD_REQUEST,
            payload: {
                password: '1314@tvwD',
                double_password: '1314@tvwD',
                hashUser: 'test3353463463'
            }
        }

        it('success', () => {
            let result = {
                status: 200,
                message: ['Password saved']
            }
            testSaga(workerCreateNewPassword, action)
                .next()
                .call(authApi.createNewPasswordApi, action.payload)
                .next(result)
                .put(actionsAuth.createNewPasswordSuccess({message: 'Password saved'}))
                .next()
                .isDone()
        });

        it('fail', () => {
            const error = new Error('Token is not valid');
            testSaga(workerCreateNewPassword, action)
                .next()
                .call(authApi.createNewPasswordApi, action.payload)
                .throw(error)
                .put(actionsAuth.createNewPasswordFail({message: error.message}))
                .next()
                .isDone()
        });
    });
})