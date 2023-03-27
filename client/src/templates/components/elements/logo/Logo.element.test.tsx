import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import Logo from "./Logo.element";

describe('Logo element', () => {
    it('render', () => {
        renderWithRouter(<Logo/>)
    });
})