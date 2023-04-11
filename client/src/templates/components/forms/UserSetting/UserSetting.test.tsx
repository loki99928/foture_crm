import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import UserSetting from "./";

describe('User setting form', (): void => {
    it('render component ', async (): Promise<any> => {
        renderWithRouter(<UserSetting/>)
    });
})