import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import User from "./";

describe('Message element', () => {
    it('render', () => {
        renderWithRouter(<User/>)
    })
})