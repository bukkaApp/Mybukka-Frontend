import React from 'react';

import TotalAmt
  from '../components/TotalAmt';

describe('Area to explore component', () => {
  const wrapper = mount(<TotalAmt />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
