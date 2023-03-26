import React from "react";
import {createMemoryHistory} from "history";
import {act, render} from "@testing-library/react";
import {Router} from "react-router";
import {Provider} from "react-redux";

import store from "../../../../../redux/store";
import {RegisterPage} from "./RegisterPage";


describe('auth page', () => {
    it('render', async () => {
        const hashHistory = createMemoryHistory()
        await act(async () => {
            const {asFragment} = render(
                <Provider store={store}>
                    <Router location={'/registration'} navigator={hashHistory}>
                        <RegisterPage/>
                    </Router>
                </Provider>
            )
        })
    })
})