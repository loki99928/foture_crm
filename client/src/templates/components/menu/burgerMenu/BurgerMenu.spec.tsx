import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import BurgerMenu from "./";

describe('BurgerMenu', (): void => {
    it('render', (): void => {
        renderWithRouter(<BurgerMenu/>)
    })
})