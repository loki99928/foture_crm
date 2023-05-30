import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import AlarmElement from "./Alarm.element";

describe('Alarm element', () => {
    it('render', function () {
        renderWithRouter(<AlarmElement/>)
    });
})