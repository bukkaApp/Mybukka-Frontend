import React from 'react';

import AddToCart from '../addToCart';

describe('Add To Cart Scene Component', () => {
  const wrapper = mount(<AddToCart />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
