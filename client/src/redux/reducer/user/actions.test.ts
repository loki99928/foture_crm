import configureStore from "redux-mock-store";

const mockStore = configureStore();
const store = mockStore();

describe('UserReduser', () => {

    beforeEach(() => {
        store.clearActions();
    });

})