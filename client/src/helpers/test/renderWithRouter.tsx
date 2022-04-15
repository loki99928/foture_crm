import {createMemoryHistory} from "history";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import store from "../../redux/store";
import {Router} from "react-router";
import React from "react";

export const renderWithRouter = (
    component: {} | null | undefined ,
    {
        location = "/",
        history = createMemoryHistory({initialEntries: [location]})
    } = {}
) => {
    return {
        ...render(
            <Provider store={store}>
                <Router location={location} navigator={history}>
                    { component }
                </Router>
            </Provider>
        ),
        history,
    }
}
