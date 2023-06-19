import configureStore from "redux-mock-store";
import {actionStatusDomElement} from "./actions";

const mockStore = configureStore();
const store = mockStore();

describe('statusDomElement', () => {

    beforeEach(() => {
        store.clearActions();
    });

    it('test', function () {

    });
})