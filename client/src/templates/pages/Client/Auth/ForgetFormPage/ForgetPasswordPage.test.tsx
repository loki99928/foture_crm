import React from "react";
import ForgetPasswordPage from "./";
import {renderWithRouter} from "../../../../../helpers/test/renderWithRouter";

describe('auth page', (): void => {
    it('render', function (): void {
        renderWithRouter(<ForgetPasswordPage/>)
    })
})