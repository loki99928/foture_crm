import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import UserMenu from "./";

describe('Message element', (): void => {
    it('render', (): void => {
        renderWithRouter(<UserMenu/>)
    })
})