import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import Header from "./";

describe('Message element', () => {
    it('render', () => {
        renderWithRouter(<Header/>)
    })
})