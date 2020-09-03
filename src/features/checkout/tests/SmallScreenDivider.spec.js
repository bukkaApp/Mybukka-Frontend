import React from 'react';

import SmallScreenDivider
  from '../common/SmallScreenDivider';

describe('Area to explore component', () => {
  const wrapper = shallow(<SmallScreenDivider />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
