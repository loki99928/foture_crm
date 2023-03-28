import React from "react";
import ForgetPasswordPage from "./";
import {renderWithRouter} from "../../../../../helpers/test/renderWithRouter";

describe('auth page', () => {
    it('render', function () {
        renderWithRouter(<ForgetPasswordPage/>)
    })
})