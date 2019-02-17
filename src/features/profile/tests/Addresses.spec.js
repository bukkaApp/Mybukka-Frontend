import React from 'react';
import Addresses from '../components/Addresses';

describe('Addresses component', () => {
  const wrapper = mount(<Addresses />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
