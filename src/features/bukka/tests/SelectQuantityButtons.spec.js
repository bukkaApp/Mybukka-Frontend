import React from 'react';
import SelectQuantityButtons from '../addToCart/SelectQuantityButtons';

describe('Select quantity buttons Component', () => {
  const wrapper = mount(<SelectQuantityButtons />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
