import React from "react";
import NewPasswordPage from "./";
import {renderWithRouter} from "../../../../../helpers/test/renderWithRouter";

describe('auth page', (): void => {
    it('render', function (): void {
        renderWithRouter(<NewPasswordPage/>)
    })
})