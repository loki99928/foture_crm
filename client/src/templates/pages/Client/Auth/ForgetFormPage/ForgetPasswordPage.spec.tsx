import React from "react";
import {createMemoryHistory} from "history";
import {render} from "@testing-library/react";
import {Router} from "react-router";
import {Provider} from "react-redux";

import store from "../../../../../redux/store";
import {ForgetPasswordPage} from "./ForgetPasswordPage";

describe('auth page', () => {
    it('render', function () {
        const hashHistory = createMemoryHistory()

        const {asFragment} = render(
            <Provider store={store}>
                <Router location={'/forget'} navigator={hashHistory}>
                    <ForgetPasswordPage/>
                </Router>
            </Provider>
        )
    })
})