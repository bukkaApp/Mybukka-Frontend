import React from 'react';

import Map from '../common/Map';

describe('Area to explore component', () => {
  const wrapper = mount(<Map />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
