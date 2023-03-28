import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import Home from "./";

describe('Message element', () => {
    it('render', () => {
        renderWithRouter(<Home/>)
    })
})