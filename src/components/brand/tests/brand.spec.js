import React from 'react';
import Brand from '../Brand';

describe('Brand component', () => {
  const wrapper = shallow(<Brand />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
