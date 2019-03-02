import React from 'react';

import PrimaryNavbar
  from '../common/PrimaryNavbar';

describe('Area to explore component', () => {
  const wrapper = shallow(<PrimaryNavbar />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
