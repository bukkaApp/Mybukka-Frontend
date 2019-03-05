import React from 'react';
import AuthModal from '../common/AuthModal';

describe('Primary Navbar', () => {
  const wrapper = shallow(
    <AuthModal push={jest.fn()} navigateToNextRoute={jest.fn()} type="Sign In" status={{ authenticated: false }} />
  );
  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
