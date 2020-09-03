import React from 'react';

import AccountDetailsGroupHeader from '../common/AccountDetailsGroupHeader';

describe('AccountDetailsGroupHeader component', () => {
  const wrapper = mount(
    <AccountDetailsGroupHeader text="Account details here" />
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
