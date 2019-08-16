import React from 'react';

import BukkaNavSmallScreen from '../BukkaNavSmallScreen';

describe('Bukka Nav Small Screen', () => {
  const wrapper = mount(
    <BukkaNavSmallScreen
      categoryItems={['fish', 'egg']}
      currentCategory="fish"
    />
  );

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
