import React from "react";
import RegisterPage from "./";
import {renderWithRouter} from "../../../../../helpers/test/renderWithRouter";

describe('auth page', () => {
    it('render', function () {
        renderWithRouter(<RegisterPage/>)
    })
})