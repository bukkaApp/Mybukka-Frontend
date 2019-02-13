import React from 'react';

import BukkaNavSmallScreen from '../BukkaNavSmallScreen';

describe('Bukka Nav Small Screen', () => {
  const wrapper = mount(<BukkaNavSmallScreen currentCategory="fish" />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
