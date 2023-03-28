import React from "react";
import {renderWithRouter} from "../../../../../helpers/test/renderWithRouter";
import UserConfirmationPage from "./";

describe('auth page', () => {
    it('render', function () {
        renderWithRouter(<UserConfirmationPage/>)
    })
})