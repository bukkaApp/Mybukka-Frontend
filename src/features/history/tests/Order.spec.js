import React from 'react';
import Order from '../common/Order';

describe('Order component', () => {
  const props = {
    quantity: '2',
    orderId: '144523',
  };

  const wrapper = mount(<Order {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
