import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import SettingsMenu from "./";

describe('Message element', (): void => {
    it('render', (): void => {
        renderWithRouter(<SettingsMenu/>)
    })
})