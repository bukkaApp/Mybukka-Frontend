import React from 'react';

import AuthenticaticatedNavbar from '../AuthenticaticatedNavbar';

describe('Authenticaticated Navbar', () => {
  const wrapper = mount(<AuthenticaticatedNavbar />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
