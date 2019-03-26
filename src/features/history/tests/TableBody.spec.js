import React from 'react';
import TableBody from '../components/TableBody';

describe('TableBody component', () => {
  const props = {
    quantity: '2',
    title: 'salad and bbq',
    handleClick: jest.fn(),
    time: '27/3/2019 12:43 pm',
    orderId: '03d77',
    price: '3000',
    status: 'pending',
    courierName: 'curier name',
    courierImg: 'https;//www.google.com/img',
    pickupAddress: 'pickup address street',
    pickupContactMobile: '03847858',
    deliveryAddress: 'delivery address street',
    deliveryName: 'mr delivery name',
    deliveryContactMobile: '94574783930',
  };

  const wrapper = mount(<TableBody {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
