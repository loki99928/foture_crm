import React from "react";
import {createMemoryHistory} from "history";
import {render} from "@testing-library/react";
import {Router} from "react-router";
import {Provider} from "react-redux";

import {HomePage} from "./HomePage";
import store from "../../../../redux/store";

describe('auth page', () => {
    it('render', function () {
        const hashHistory = createMemoryHistory()

        const { asFragment } = render(
            <Provider store={store}>
                <Router location={'/'} navigator={hashHistory}>
                    <HomePage/>
                </Router>
            </Provider>
        )

        expect(asFragment()).toMatchSnapshot()
    })
})