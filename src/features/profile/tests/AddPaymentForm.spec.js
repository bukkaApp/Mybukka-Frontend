import React from 'react';
import AddPaymentForm from '../forms/AddPaymentForm';

describe('AddPayment form component', () => {
  const wrapper = mount(<AddPaymentForm />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
