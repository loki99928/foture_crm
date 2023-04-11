import configureStore from "redux-mock-store";
import {actionsAuth} from "./actions";
import {authEnum} from "./types";

const mockStore = configureStore();
const store = mockStore();

describe('AuthReducer', () => {

    beforeEach(() => {
        store.clearActions();
    });

    it('registerUserRequest', () => {
        const data = {
            email: 'loki99928@yandex.ru',
            password: '123Qw@',
        }
        const expectedActions = [{
            "payload": {
                "user": data,
            },
            "type": authEnum.REGISTER_USER_REQUEST,
        }];
        store.dispatch(actionsAuth.registerUserRequest(data));
        expect(store.getActions()).toEqual(expectedActions);
    })

    it('registerUserSuccess', () => {
        const data = {
            message: 'Success',
        }
        const expectedActions = [{
            "payload": data,
            "type": authEnum.REGISTER_USER_SUCCESS,
        }];
        store.dispatch(actionsAuth.registerUserSuccess(data));
        expect(store.getActions()).toEqual(expectedActions);
    })

    it('registerUserFail', () => {
        const data = {
            message: 'FAIL',
        }
        const expectedActions = [{
            "payload": data,
            "type": authEnum.REGISTER_USER_FAIL,
        }];
        store.dispatch(actionsAuth.registerUserFail(data));
        expect(store.getActions()).toEqual(expectedActions);
    })

    it('authUserRequest', () => {
        const data = {
            email: 'loki99928@yandex.ru',
            password: '123Qw@',
        }
        const expectedActions = [{
            "payload": {
                "user": data,
            },
            "type": authEnum.AUTH_USER_REQUEST,
        }];
        store.dispatch(actionsAuth.authUserRequest(data));
        expect(store.getActions()).toEqual(expectedActions);
    })

    it('authUserSuccess', () => {
        const data = {
            userId: 1,
            accessToken: 'ad34'
        }
        const expectedActions = [{
            "payload": {
                user: data,
            },
            "type": authEnum.AUTH_USER_SUCCESS,
        }];
        store.dispatch(actionsAuth.authUserSuccess(data));
        expect(store.getActions()).toEqual(expectedActions);
    })

    it('authUserFail', () => {
        const data = {
            message: 'FAIL',
        }
        const expectedActions = [{
            "payload": data,
            "type": authEnum.AUTH_USER_FAIL,
        }];
        store.dispatch(actionsAuth.authUserFail(data));
        expect(store.getActions()).toEqual(expectedActions);
    })

    it('authUserDataRequest', () => {
        const expectedActions = [{
            "type": authEnum.CHECK_AUTH_USER_REQUEST,
        }];
        store.dispatch(actionsAuth.authUserDataRequest());
        expect(store.getActions()).toEqual(expectedActions);
    })

    it('authUserDataSuccess', () => {
        const data = {
            userId: 1,
            email: 'email',
            accessToken: 'accessToken',
            avatarUrl: 'avatarUrl',
            role: 'role'
        }
        const expectedActions = [{
            "payload": {
                user: data,
            },
            "type": authEnum.CHECK_AUTH_USER_SUCCESS,
        }];
        store.dispatch(actionsAuth.authUserDataSuccess(data));
        expect(store.getActions()).toEqual(expectedActions);
    })

    it('authUserDataFail', () => {
        const expectedActions = [{
            "type": authEnum.CHECK_AUTH_USER_FAIL,
        }];
        store.dispatch(actionsAuth.authUserDataFail());
        expect(store.getActions()).toEqual(expectedActions);
    })

    it('confirmUserRequest', () => {
        const hashUser = 'sdfwae5345'
        const expectedActions = [{
            "payload": {hashUser: hashUser},
            "type": authEnum.CONFIRM_USER_REQUEST,
        }];
        store.dispatch(actionsAuth.confirmUserRequest(hashUser));
        expect(store.getActions()).toEqual(expectedActions);
    })
    it('confirmUserSuccess', () => {
        const data = {
            message: 'FAIL',
        }
        const expectedActions = [{
            payload: data,
            "type": authEnum.CONFIRM_USER_SUCCESS,
        }];
        store.dispatch(actionsAuth.confirmUserSuccess(data));
        expect(store.getActions()).toEqual(expectedActions);
    })
    it('confirmUserFail', () => {
        const data = {
            message: 'FAIL',
        }
        const expectedActions = [{
            payload: data,
            "type": authEnum.CONFIRM_USER_FAIL,
        }];
        store.dispatch(actionsAuth.confirmUserFail(data));
        expect(store.getActions()).toEqual(expectedActions);
    })

    it('forgetUserRequest', () => {
        const data = {
            email: 'email',
        }
        const expectedActions = [{
            payload: {
                user: data
            },
            "type": authEnum.FORGET_USER_REQUEST,
        }];
        store.dispatch(actionsAuth.forgetUserRequest(data));
        expect(store.getActions()).toEqual(expectedActions);
    })
    it('forgetUserSuccess', () => {
        const data = {
            message: 'SUCCESS',
        }
        const expectedActions = [{
            payload: data,
            "type": authEnum.FORGET_USER_SUCCESS,
        }];
        store.dispatch(actionsAuth.forgetUserSuccess(data));
        expect(store.getActions()).toEqual(expectedActions);
    })
    it('forgetUserFail', () => {
        const data = {
            message: 'FAIL',
        }
        const expectedActions = [{
            payload: data,
            "type": authEnum.FORGET_USER_FAIL,
        }];
        store.dispatch(actionsAuth.forgetUserFail(data));
        expect(store.getActions()).toEqual(expectedActions);
    })

    it('checkTemporaryTokenRequest', () => {
        const hashUser = 'sdfwae5345'
        const expectedActions = [{
            "payload": {hashUser: hashUser},
            "type": authEnum.CHECK_TEMPORARY_TOKEN_REQUEST,
        }];
        store.dispatch(actionsAuth.checkTemporaryTokenRequest(hashUser));
        expect(store.getActions()).toEqual(expectedActions);
    })
    it('checkTemporaryTokenSuccess', () => {
        const data = {
            message: 'SUCCESS',
        }
        const expectedActions = [{
            payload: data,
            "type": authEnum.CHECK_TEMPORARY_TOKEN_SUCCESS,
        }];
        store.dispatch(actionsAuth.checkTemporaryTokenSuccess(data));
        expect(store.getActions()).toEqual(expectedActions);
    })
    it('checkTemporaryTokenFail', () => {
        const data = {
            message: 'FAIL',
        }
        const expectedActions = [{
            payload: data,
            "type": authEnum.CHECK_TEMPORARY_TOKEN_FAIL,
        }];
        store.dispatch(actionsAuth.checkTemporaryTokenFail(data));
        expect(store.getActions()).toEqual(expectedActions);
    })

    it('createNewPasswordResponse', () => {
        const data = {
            password: 'password',
            double_password: 'double_password',
            hashUser: 'hashUser'
        }
        const expectedActions = [{
            payload: data,
            "type": authEnum.CREATE_NEW_PASSWORD_REQUEST,
        }];
        store.dispatch(actionsAuth.createNewPasswordResponse(data));
        expect(store.getActions()).toEqual(expectedActions);
    })
    it('createNewPasswordSuccess', () => {
        const data = {
            message: 'SUCCESS',
        }
        const expectedActions = [{
            payload: data,
            "type": authEnum.CREATE_NEW_PASSWORD_SUCCESS,
        }];
        store.dispatch(actionsAuth.createNewPasswordSuccess(data));
        expect(store.getActions()).toEqual(expectedActions);
    })
    it('createNewPasswordFail', () => {
        const data = {
            message: 'FAIL',
        }
        const expectedActions = [{
            payload: data,
            "type": authEnum.CREATE_NEW_PASSWORD_FAIL,
        }];
        store.dispatch(actionsAuth.createNewPasswordFail(data));
        expect(store.getActions()).toEqual(expectedActions);
    })

    it('logoutRequest', () => {
        const expectedActions = [{
            "type": authEnum.LOGOUT_REQUEST,
        }];
        store.dispatch(actionsAuth.logoutRequest());
        expect(store.getActions()).toEqual(expectedActions);
    })
    it('logoutSuccess', () => {
        const expectedActions = [{
            "type": authEnum.LOGOUT_SUCCESS,
        }];
        store.dispatch(actionsAuth.logoutSuccess());
        expect(store.getActions()).toEqual(expectedActions);
    })
})