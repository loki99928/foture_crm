import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import PopupWatermark from "./";

describe('PopupWatermark', (): void => {
    it('render', (): void => {
        renderWithRouter(<PopupWatermark title="Add Watermark"/>)
    });
})