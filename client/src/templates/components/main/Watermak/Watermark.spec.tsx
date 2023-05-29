import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import Watermark from "./";

describe('Message element', (): void => {
    it('render', (): void => {
        renderWithRouter(<Watermark/>)
    })
})