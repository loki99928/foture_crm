import React from "react";

import AuthPage from "./";
import {renderWithRouter} from "../../../../../helpers/test/renderWithRouter";

describe('auth page', () => {
    it('render', function () {
        renderWithRouter(<AuthPage/>)
    })
})