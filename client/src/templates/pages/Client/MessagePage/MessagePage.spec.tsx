import React from "react";
import {createMemoryHistory} from "history";

import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import AlarmElement from "../../../components/elements/alarm";

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
describe('MessagePage', (): void => {
    it('render', function (): void {
        const hashHistory = createMemoryHistory()

        renderWithRouter(<AlarmElement/>)
        // render(
        //         <MessagePage/>
        //     // <MemoryRouter initialEntries={[{pathname: '/', search: '?value=teresa_teng'}]}>
        //     // </MemoryRouter>
        //     // <Provider store={store}>
        //     //     <Router location={'/'} navigator={hashHistory}>
        //     //         <MessagePage/>
        //     //     </Router>
        //     // </Provider>
        // )
        // screen.debug()
        // expect(asFragment()).toMatchSnapshot()
    })
})