import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import HeaderMineMenu from "./";

describe('Message element', (): void => {
    it('render', (): void => {
        renderWithRouter(<HeaderMineMenu/>)
    })
})