import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import HomePage from "./";

describe('Message element', () => {
    it('render', () => {
        renderWithRouter(<HomePage/>)
    })
})