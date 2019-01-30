import React from 'react';

import SearchLocation from '../common/SearchLocation';

describe('Search Location', () => {
  const wrapper = mount(<SearchLocation />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
