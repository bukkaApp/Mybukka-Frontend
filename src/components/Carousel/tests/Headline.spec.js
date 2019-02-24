import React from 'react';

import Headline from '../Headline';

describe('Headline Components', () => {
  const props = {
    title: 'Headline',
    numberOfViews: 2,
    slidesLength: 3,
    activeIndex: 1,
  };

  const wrapper = mount(<Headline {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
