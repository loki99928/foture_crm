import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import User from "./";

describe('Message element', (): void => {
    it('render', (): void => {
        renderWithRouter(<User/>)
    })
})