import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import SearchForm from "./";

describe('Message element', () => {
    it('render', () => {
        renderWithRouter(<SearchForm/>)
    })
})