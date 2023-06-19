import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import BurgerMenu from "./";
import {screen} from "@testing-library/react";

describe('BurgerMenu', (): void => {
    it('render', (): void => {
        renderWithRouter(<BurgerMenu/>)
    })

    it('has menu', (): void => {
        renderWithRouter(<BurgerMenu/>)
        expect(screen.getByTestId('burger_menu'))
    })
})