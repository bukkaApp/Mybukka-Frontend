import React from 'react';
import Payment from '../components/Payment';

describe('PaymentSection Component', () => {
  const wrapper = mount(<Payment />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
