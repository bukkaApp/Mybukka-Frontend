import React from 'react';

import ProfileHeaderTitle from '../common/ProfileHeaderTitle';

describe('ProfileHeaderTitle component', () => {
  const props = {
    firstName: 'First',
    lastName: 'Last'
  };

  const wrapper = mount(
    <ProfileHeaderTitle {...props} />
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
