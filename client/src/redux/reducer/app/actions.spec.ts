import configureStore from "redux-mock-store";
import {appEnum} from "./types";
import {actionsApp} from "./actions";

const mockStore = configureStore();
const store = mockStore();

describe('App reducer', () => {

    beforeEach(() => {
        store.clearActions();
    });

    it('initializedRequest', () => {
        const expectedActions = [{
            "type": appEnum.SET_INITIALIZED_REQUEST,
        }];
        store.dispatch(actionsApp.initializedRequest());
        expect(store.getActions()).toEqual(expectedActions);
    })
    it('initializedSuccess', () => {
        const expectedActions = [{
            "type": appEnum.SET_INITIALIZED_SUCCESS,
        }];
        store.dispatch(actionsApp.initializedSuccess());
        expect(store.getActions()).toEqual(expectedActions);
    })
})