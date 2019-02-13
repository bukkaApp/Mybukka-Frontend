import React from 'react';

import Time
  from '../components/Time';

describe('Area to explore component', () => {
  const wrapper = mount(<Time />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
