import React from 'react';

import DeliveryAddress from '../components/DeliveryAddress';

describe('Area to explore component', () => {
  const props = {
    handleClick: jest.fn(),
    handleChange: jest.fn()
  };
  const wrapper = mount(<DeliveryAddress {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
