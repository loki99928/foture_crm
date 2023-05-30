import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import Sidebar from "./";

describe('Message element', (): void => {
    it('render', (): void => {
        renderWithRouter(<Sidebar/>)
    })
})