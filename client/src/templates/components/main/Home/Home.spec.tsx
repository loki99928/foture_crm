import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import Home from "./";

describe('Message element', (): void => {
    it('render', (): void => {
        renderWithRouter(<Home/>)
    })
})