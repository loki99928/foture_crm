import React from "react";
import {renderWithRouter} from "../../../../helpers/test/renderWithRouter";
import UserPage from "./";

describe('auth page', () => {
    it('render', function () {
        renderWithRouter(<UserPage/>)
    })
})