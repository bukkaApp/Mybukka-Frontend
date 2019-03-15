import React from 'react';
import ProfileImageSection from '../components/ProfileImageSection';

describe('ProfileImageSection component', () => {
  const props = {
    firstName: 'save', lastName: 'save'
  };
  const wrapper = mount(<ProfileImageSection {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
