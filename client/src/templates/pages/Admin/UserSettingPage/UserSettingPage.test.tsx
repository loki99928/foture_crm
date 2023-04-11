import React from "react";
import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import UserSettingPage from "./";

describe('auth page', (): void => {
    it('render', function (): void {
        renderWithRouter(<UserSettingPage/>)
    })
})