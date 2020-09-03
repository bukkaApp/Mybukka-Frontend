import React from 'react';
import ProfileHeader from '../components/ProfileHeader';

describe('Profileheader component', () => {
  const props = {
    firstName: 'FirtName',
    lastName: 'lastName',
  };

  const wrapper = mount(<ProfileHeader {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
