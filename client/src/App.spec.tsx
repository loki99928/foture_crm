import React from 'react';
import MineApp from './App';
import {render} from "@testing-library/react";


describe('App', () => {

  it('render', () => {
    render(<MineApp/>)
  });

})