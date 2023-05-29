import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import Watermark from "../../../components/main/Watermak";

describe('Message element', (): void => {
    it('render', (): void => {
        renderWithRouter(<Watermark/>)
    })
})