import React from 'react';
import Logo from '../common/Logo';


describe('Area to explore component', () => {
  const wrapper = shallow(<Logo />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
