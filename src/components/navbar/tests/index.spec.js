import React from 'react';

import Index from '..';

describe('Bukka Nav Small Screen', () => {
  const wrapper = mount(<Index />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
