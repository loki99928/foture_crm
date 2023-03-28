import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import Message from "./";

describe('Message element', () => {
    it('render', () => {
        renderWithRouter(<Message/>)
    })
})