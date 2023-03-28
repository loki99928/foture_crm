import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import Sidebar from "./";

describe('Message element', () => {
    it('render', () => {
        renderWithRouter(<Sidebar/>)
    })
})