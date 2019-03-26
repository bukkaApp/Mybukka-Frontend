import React from 'react';
import PickUp from '../common/PickUp';

describe('PickUp component', () => {
  const props = {
    title: 'title',
    pickupAddress: 'pickup address',
    pickupContactMobile: '0973738939',
  };

  const wrapper = mount(<PickUp {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
