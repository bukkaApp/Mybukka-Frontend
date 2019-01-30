import React from 'react';
import PrimaryNavbar from '../PrimaryNavbar';

describe('Primary Navbar', () => {
  const wrapper = shallow(<PrimaryNavbar />);
  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
