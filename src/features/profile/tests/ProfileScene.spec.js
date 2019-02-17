import React from 'react';
import ProfileScene from '../components/ProfileScene';

describe('Profile Scene component', () => {
  const wrapper = mount(<ProfileScene />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
