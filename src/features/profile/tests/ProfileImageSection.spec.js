import React from 'react';
import ProfileImageSection from '../components/ProfileImageSection';

describe('ProfileImageSection component', () => {
  const wrapper = mount(<ProfileImageSection />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
