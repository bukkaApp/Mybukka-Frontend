import React from 'react';
import PrimaryNavbar from '../PrimaryNavbar';

describe('Primary Navbar', () => {
  const wrapper = shallow(
    <PrimaryNavbar push={jest.fn()} navigateToNextRoute={jest.fn()} />
  );
  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
