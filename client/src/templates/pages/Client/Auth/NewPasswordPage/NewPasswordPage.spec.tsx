import React from "react";
import {createMemoryHistory} from "history";
import {render, screen} from "@testing-library/react";
import {Router} from "react-router";
import {Provider} from "react-redux";
import store from "../../../../../redux/store";
import {NewPasswordPage} from "./NewPasswordPage";

describe('auth page', () => {
    it('render', function () {
        const hashHistory = createMemoryHistory()
        const { asFragment } = render(
            <Provider store={store}>
                <Router location={'/new_password/:token'} navigator={hashHistory}>
                    <NewPasswordPage/>
                </Router>
            </Provider>
        )
        expect(asFragment()).toMatchSnapshot()
    })
})