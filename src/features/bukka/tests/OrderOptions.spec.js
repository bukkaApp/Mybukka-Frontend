import React from 'react';
import OrderOptions from '../addToCart/OrderOptions';

describe('Order Options Component', () => {
  const props = {
    title: 'Amala',
    descriptions: 'best meal youll ever eat'
  };
  const wrapper = mount(<OrderOptions {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
