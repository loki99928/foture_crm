import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import UserMenu from "./";

describe('Message element', () => {
    it('render', () => {
        renderWithRouter(<UserMenu/>)
    })
})