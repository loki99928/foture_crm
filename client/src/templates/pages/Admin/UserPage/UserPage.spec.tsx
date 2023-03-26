import React from "react";
import {createMemoryHistory} from "history";
import {render} from "@testing-library/react";
import {Router} from "react-router";
import {Provider} from "react-redux";

import store from "../../../../redux/store";
import User from "../../../components/main/User/User";

describe('auth page', () => {
    it('render', function () {
        const hashHistory = createMemoryHistory()

        const {asFragment} = render(
            <Provider store={store}>
                <Router location={'/'} navigator={hashHistory}>
                    <User/>
                </Router>
            </Provider>
        )
    })
})