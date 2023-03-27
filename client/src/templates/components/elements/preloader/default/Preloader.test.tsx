import {renderWithRouter} from "../../../../../helpers/test/renderWithRouter";
import {Preloader} from "./Preloader";

describe('Preloader', () => {
    it('render', () => {
        renderWithRouter(<Preloader/>);
    })
})