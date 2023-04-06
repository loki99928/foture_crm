import React from "react";
import {renderWithRouter} from "../../../../../helpers/test/renderWithRouter";
import UserConfirmationPage from "./";

describe('auth page', (): void => {
    it('render', function (): void {
        renderWithRouter(<UserConfirmationPage/>)
    })
})