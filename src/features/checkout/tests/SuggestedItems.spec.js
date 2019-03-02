import React from 'react';

import SuggestedItems
  from '../components/SuggestedItems';

describe('Area to explore component', () => {
  const wrapper = mount(<SuggestedItems />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
