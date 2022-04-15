import React from "react";
import {createMemoryHistory} from "history";
import {render} from "@testing-library/react";
import {Router} from "react-router";
import {Provider} from "react-redux";

import store from "../../../redux/store";
import {HomePage} from "./HomePage";

describe('Auth page', () => {
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