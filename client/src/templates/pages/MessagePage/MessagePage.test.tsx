import React from "react";
import {createMemoryHistory} from "history";
import {render, screen} from "@testing-library/react";
import {MemoryRouter, Router} from "react-router";
import {Provider} from "react-redux";
import {useLocation} from "react-router";

import store from "../../../redux/store";
import {MessagePage} from "./MessagePage";

// jest.mock('react-router', () => ({
//     useLocation: jest.fn().mockReturnValue({
//         // type: 'statusNewPasswordToken'
//     }),
// }));
// jest.mock('react-router', () => ({
//     useHistory: () => jest.fn().mockReturnValue({
//         push: jest.fn(),
//     }),
// }));
// todo-dv разобраться с отображение текста ошибки
describe('MessagePage', () => {
    it('render', function () {
        const hashHistory = createMemoryHistory()

        // render(
        //     <MessagePage/>
        // )

        render(
            <MemoryRouter initialEntries={[{ pathname: '/', search: '?value=teresa_teng' }]}>
                <MessagePage />
            </MemoryRouter>
            // <Provider store={store}>
            //     <Router location={'/'} navigator={hashHistory}>
            //         <MessagePage/>
            //     </Router>
            // </Provider>
        )
        screen.debug()
        // expect(asFragment()).toMatchSnapshot()
    })
})