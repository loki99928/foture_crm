import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import HomePage from "./";

describe('Message element', (): void => {
    it('render', (): void => {
        renderWithRouter(<HomePage/>)
    })
})