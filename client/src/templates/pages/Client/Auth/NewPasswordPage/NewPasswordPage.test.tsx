import React from "react";
import NewPasswordPage from "./";
import {renderWithRouter} from "../../../../../helpers/test/renderWithRouter";

describe('auth page', () => {
    it('render', function () {
        renderWithRouter(<NewPasswordPage/>)
    })
})