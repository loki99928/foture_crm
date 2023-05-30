import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import MessageElement from "./Message.element";

describe('Message element', () => {
    it('render', () => {
        renderWithRouter(<MessageElement/>)
    })
})