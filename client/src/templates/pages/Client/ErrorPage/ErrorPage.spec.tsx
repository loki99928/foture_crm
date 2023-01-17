import React from "react";
import {createMemoryHistory} from "history";
import {render} from "@testing-library/react";
import {Router} from "react-router";
import {Provider} from "react-redux";

import {ErrorPage} from "./ErrorPage";
import store from "../../../../redux/store";

describe('auth page', () => {
    it('Snapshot', function () {
        const hashHistory = createMemoryHistory()

        const { asFragment } = render(
            <Provider store={store}>
                <Router location={'/auth'} navigator={hashHistory}>
                    <ErrorPage/>
                </Router>
            </Provider>
        )

        expect(asFragment()).toMatchSnapshot()
    })
})