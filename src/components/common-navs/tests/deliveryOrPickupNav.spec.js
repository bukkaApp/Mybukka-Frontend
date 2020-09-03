import React from 'react';

import DeliveryOrPickupNav from '../DeliveryOrPickupNav';

describe('DeliveryOrPickupNav component', () => {
  const wrapper = shallow(<DeliveryOrPickupNav />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
