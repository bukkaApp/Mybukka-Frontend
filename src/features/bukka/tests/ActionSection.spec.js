import React from 'react';
import ActionSection from '../addToCart/ActionSection';

describe('Action Section Component', () => {
  const props = {
    price: 15,
    handleClick: jest.fn(),
  };
  const wrapper = mount(<ActionSection {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
