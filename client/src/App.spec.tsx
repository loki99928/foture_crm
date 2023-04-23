import React from 'react';
import MineApp from './App';
import {act, render} from "@testing-library/react";


describe('App', () => {
    it('render', async () => {
        await act(async () => {
            render(<MineApp/>)
        })
    });
})