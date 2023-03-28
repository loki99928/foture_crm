import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import SettingsMenu from "./";

describe('Message element', () => {
    it('render', () => {
        renderWithRouter(<SettingsMenu/>)
    })
})