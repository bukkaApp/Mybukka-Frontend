import React from 'react';
import Index from '../index';

describe('Home Component', () => {
  const wrapper = shallow(<Index />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
