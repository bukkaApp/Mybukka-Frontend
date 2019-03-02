import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import ShoppingCart from '../components/ShoppingCart';

describe('Area to explore component', () => {
  const wrapper = render(
    <MemoryRouter>
      <ShoppingCart />
    </MemoryRouter>
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
