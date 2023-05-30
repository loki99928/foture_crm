import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import SearchForm from "./";

describe('Message element', (): void => {
    it('render', (): void => {
        renderWithRouter(<SearchForm/>)
    })
})