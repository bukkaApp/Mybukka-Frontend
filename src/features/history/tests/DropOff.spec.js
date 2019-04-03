import React from 'react';
import DropOff from '../common/DropOff';

describe('DropOff component', () => {
  const props = {
    deliveryName: 'delivery name',
    deliveryAddress: 'delivery address',
    deliveryContactMobile: '09098891282',
  };

  const wrapper = mount(<DropOff {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
