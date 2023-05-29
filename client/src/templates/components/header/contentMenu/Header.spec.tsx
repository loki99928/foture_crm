import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import Header from "./";

describe('Message element', (): void => {
    it('render', (): void => {
        renderWithRouter(<Header/>)
    })
})