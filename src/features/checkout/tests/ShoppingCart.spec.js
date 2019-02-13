import React from 'react';

import ShoppingCart
  from '../components/ShoppingCart';

describe('Area to explore component', () => {
  const wrapper = mount(<ShoppingCart />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
