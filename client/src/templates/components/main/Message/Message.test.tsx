import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import Message from "./";

describe('Message element', (): void => {
    it('render', (): void => {
        renderWithRouter(<Message/>)
    })
})