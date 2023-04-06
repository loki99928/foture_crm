import React from "react";
import RegisterPage from "./";
import {renderWithRouter} from "../../../../../helpers/test/renderWithRouter";

describe('auth page', (): void => {
    it('render', function (): void {
        renderWithRouter(<RegisterPage/>)
    })
})