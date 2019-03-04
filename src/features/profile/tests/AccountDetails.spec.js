import React from 'react';
import AccountDetails from '../components/AccountDetails';

describe('Account Details components', () => {
  const wrapper = mount(<AccountDetails />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
